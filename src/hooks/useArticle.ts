import { Article } from '../model'
import React from 'react'
import { fetchArticle } from '../api'

const useArticle = ({ id }: { id: string }) => {
    const [article, setArticle] = React.useState<Article | null>()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        setLoading(true)
        setArticle(null)
        fetchArticle(id).then((response) => {
            setArticle(response)
            setLoading(false)
        })
    }, [id])

    return { article, loading }
}

export default useArticle
