import { Article, IFeedParams } from '../model'
import useApi from './useApi'
import React from 'react'
import debounce from 'lodash.debounce'

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
            const apiResponse = await fetchMultiple(
                { searchTerm, section },
                index + 1
            )
            setIndex(index + 1)
            setIsComplete(!apiResponse.length)
            setFeed([...feed, ...apiResponse])
        }
    }

    return { feed, isComplete }
}

export default useFeed
