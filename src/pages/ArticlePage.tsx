import React from 'react'
import ShareButtons from '../components/ShareButtons'
import { Article } from '../model/article'
import ArticleTeaser from '../components/ArticleTeaser'
import { useParams, useHistory } from 'react-router-dom'
import useApi from '../hooks/useApi'
import LoadingSpinner from '../components/LoadingSpinner'

const ArticlePage = () => {
    const [article, setArticle] = React.useState<Article | undefined>()
    const [related, setRelated] = React.useState<Article[]>([])
    const params: { id: string } = useParams()
    const { fetchSingle, fetchMultiple } = useApi()
    const history = useHistory()

    React.useEffect(() => {
        setArticle(undefined)
        init(params.id)
    }, [params.id])

    const init = async (id: string) => {
        const article = await fetchSingle(id)

        if (article) {
            window.scrollTo(0, 0)
            if (article.fields.headline) {
                document.title = article.fields.headline + ' | Code Smart News'
            }

            setArticle(article)
            const feed = await fetchMultiple({ section: article.sectionId }, 1)
            setRelated(feed.filter((el) => el.id !== article.id).slice(0, 6))
        } else {
            history.push('/')
        }
    }
    if (!article) return <LoadingSpinner />

    return (
        <div className="inner fade-in px-3">
            <h2 className="text-left">{article.fields.headline}</h2>
            <p className="byline text-muted">
                {article.timeAgo + ' by ' + article.fields.byline}
            </p>
            <ShareButtons />
            <hr />

            <img
                className="w-100"
                alt={article.fields.headline}
                src={article.fields.thumbnail}
            />
            <div className="img-sub font-italic mb-4">
                {article.fields.trailText}
            </div>
            <div
                className="text-justify"
                dangerouslySetInnerHTML={{
                    __html: article.fields.body || '',
                }}
            />
            <hr />

            <h3 className="mt-5 mb-4">{'More ' + article.sectionName}</h3>
            <div className="row">
                {related.map((article, key) => (
                    <div key={key} className={'col-sm-6 col-md-4'}>
                        <ArticleTeaser article={article} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticlePage
