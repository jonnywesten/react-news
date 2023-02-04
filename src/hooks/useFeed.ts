import { Article } from '../model/article'
import useApi from './useApi'
import React from 'react'

export interface IFeedParams {
    section?: string
    searchTerm?: string
}

const useFeed = ({ searchTerm, section }: IFeedParams) => {
    const [feed, setFeed] = React.useState<Article[]>([])
    const [params, setParams] = React.useState<IFeedParams>({
        searchTerm,
        section,
    })
    const [index, setIndex] = React.useState(0)
    const { fetchMultiple } = useApi()
    const [isComplete, setIsComplete] = React.useState(false)

    React.useEffect(() => {
        if (params.searchTerm || params.section) {
            setIsComplete(false)
            setFeed([])
            setIndex(0)
        }
    }, [params?.searchTerm, params?.section])

    React.useEffect(() => {
        if (feed.length === 0 && (params.searchTerm || params.section)) {
            loadNext()
        }
    }, [feed])

    const loadNext = async () => {
        if (!isComplete) {
            const apiResponse = await fetchMultiple(params, index + 1)
            setIndex(index + 1)
            setIsComplete(!apiResponse.length)
            setFeed([...feed, ...apiResponse])
        }
    }

    return { feed, setParams, isComplete, loadNext }
}

export default useFeed
