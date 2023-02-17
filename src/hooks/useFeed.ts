import { Article, IFeedParams } from '../model'
import React from 'react'
import debounce from 'lodash.debounce'
import { fetchArticleFeed } from '../api'

const useFeed = ({ searchTerm, section }: IFeedParams) => {
    const [feed, setFeed] = React.useState<Article[]>([])
    const [index, setIndex] = React.useState(0)
    const [isComplete, setIsComplete] = React.useState(false)

    React.useEffect(() => {
        if (searchTerm || section) {
            setIsComplete(false)
            setFeed([])
            setIndex(0)
        }
    }, [searchTerm, section])

    React.useEffect(() => {
        if (feed.length === 0 && (searchTerm || section)) {
            updateFeed()
        }
    }, [feed])

    React.useEffect(() => {
        window.onscroll = debounce(() => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 700
            ) {
                updateFeed()
            }
        }, 100)

        return () => {
            window.onscroll = null
        }
    })

    const updateFeed = async () => {
        if (!isComplete) {
            const response = await fetchArticleFeed(
                { searchTerm, section },
                index + 1
            )
            setIndex(index + 1)
            setIsComplete(!response.length)
            setFeed([...feed, ...response])
        }
    }

    return { feed, isComplete }
}

export default useFeed
