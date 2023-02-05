import React from 'react'
import ArticleTeaser from '../components/ArticleTeaser'
import { useParams } from 'react-router-dom'
import useFeed, { IFeedParams } from '../hooks/useFeed'
import LoadingSpinner from '../components/LoadingSpinner'

const FeedPage = () => {
    const params: IFeedParams = useParams()
    const { searchTerm, section } = params
    const { feed, isComplete } = useFeed(params)

    React.useEffect(() => {
        window.document.title =
            (section || searchTerm)?.replace(/^\w/, (c) => c.toUpperCase()) +
            ' | React News'
    })

    return (
        <div className="row">
            {searchTerm && (
                <div className="col-12 mb-3 text-bold">
                    <h2>{`Results for search term '${searchTerm}':`}</h2>
                </div>
            )}
            {feed.map((article, i) => (
                <div
                    key={article.id + i}
                    className={
                        i === 0
                            ? 'col-sm-12 col-md-8 col-lg-6'
                            : 'col-sm-6 col-md-4 col-lg-3'
                    }
                >
                    <ArticleTeaser article={article} />
                </div>
            ))}
            {!isComplete && <LoadingSpinner />}
        </div>
    )
}

export default FeedPage
