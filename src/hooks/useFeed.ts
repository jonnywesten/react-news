import { Article } from '../model/article'
import useApi from './useApi'
import React from 'react'

export interface IFeedParams {
    searchTerm?: string
    section?: string
}

const useFeed = ({ searchTerm, section }: IFeedParams) => {
    const [feed, setFeed] = React.useState<Article[]>([])
    const [index, setIndex] = React.useState(0)
    const [isComplete, setIsComplete] = React.useState(false)
    const { fetchMultiple } = useApi()

    React.useEffect(() => {
        if (searchTerm || section) {
            setIsComplete(false)
            setFeed([])
            setIndex(0)
        }
    }, [searchTerm, section])

    React.useEffect(() => {
        if (feed.length === 0 && (searchTerm || section)) {
            loadNext()
        }
    }, [feed])

    const loadNext = async () => {
        if (!isComplete) {
            const apiResponse = await fetchMultiple(
                { searchTerm, section },
                index + 1
            )
            setIndex(index + 1)
            setIsComplete(!apiResponse.length)
            setFeed([...feed, ...apiResponse])
        }
    }

    return { feed, isComplete, loadNext }
}

export default useFeed
