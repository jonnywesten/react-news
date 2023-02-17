import React from 'react'
import ArticleTeaser from '../components/ArticleTeaser'
import { useParams } from 'react-router-dom'
import useFeed from '../hooks/useFeed'
import LoadingSpinner from '../components/LoadingSpinner'
import { IFeedParams } from '../model'

const FeedPage = () => {
    const params: IFeedParams = useParams()
    const { searchTerm, section } = params
    const { feed, isComplete } = useFeed(params)

    React.useEffect(() => {
        document.title =
            (section || searchTerm)?.replace(/^\w/, (c) => c.toUpperCase()) +
            ' | React News'
    }, [section, searchTerm])

    return (
        <div className="row">
            <div className="col-12 mb-3">
                {searchTerm && (
                    <h2 className="fade-in">
                        {`Results for search term '${searchTerm}':`}
                    </h2>
                )}
            </div>
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
