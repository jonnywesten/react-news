import React from 'react'
import ShareButtons from '../components/ShareButtons'
import ArticleTeaser from '../components/ArticleTeaser'
import { useParams, useHistory } from 'react-router-dom'
import useFeed from '../hooks/useFeed'
import LoadingSpinner from '../components/LoadingSpinner'
import useArticle from '../hooks/useArticle'

const ArticlePage = () => {
    const params: { id: string } = useParams()
    const { article, loading } = useArticle({ id: params.id })
    const { feed, isComplete } = useFeed({ section: article?.sectionId })
    const history = useHistory()

    React.useEffect(() => {
        if (!loading && !article) {
            history.push('/')
        }
    }, [loading])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (article) {
            document.title = `${article?.fields.headline} | React News`
        }
    }, [article])

    if (!article) return <LoadingSpinner />

    return (
        <div className="article-content fade-in pt-3">
            <h2 className="text-left">{article.fields.headline}</h2>
            <p className="byline text-muted">
                {`${article.timeAgo} by ${article.fields.byline}`}
            </p>
            <ShareButtons />
            <img
                className="w-100 mt-2"
                alt={article.fields.headline}
                src={article.fields.thumbnail}
            />
            <div className="img-sub font-italic mt-1 mb-4">
                {article.fields.trailText}
            </div>
            <div
                className="mb-2"
                dangerouslySetInnerHTML={{
                    __html: article.fields.body,
                }}
            />
            <h3 className="mt-5 mb-4">{`More ${article.sectionName}`}</h3>
            <div className="row">
                {feed
                    .filter((el) => el.id !== article.id)
                    .map((article, key) => (
                        <div key={key} className={'col-sm-6 col-md-4'}>
                            <ArticleTeaser article={article} />
                        </div>
                    ))}
            </div>
            {!isComplete && <LoadingSpinner />}
        </div>
    )
}

export default ArticlePage
