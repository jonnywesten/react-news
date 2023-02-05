import { Article } from '../model/article'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { IFeedParams } from './useFeed'
TimeAgo.addLocale(en)

const useApi = () => {
    const API_URL = 'https://content.guardianapis.com/search?'
    const API_KEY = '&api-key=57384910-e081-4e48-b70d-aed1b15c0aa3'

    const _isValid = (a: Article) =>
        a.type === 'article' && !!a.fields.thumbnail
    const _handleArticle = (a: Article) => {
        a.timeAgo = new TimeAgo('en-US').format(new Date(a.webPublicationDate))
        a.fields.trailText = a.fields.trailText.replace(/<\/?[^>]+(>|$)/g, '')
        return a
    }

    const fetchSingle = (id: string): Promise<Article> => {
        const query = `&show-fields=thumbnail,trailText,headline,byline,body&ids=${id}`
        return _fetchFromApi(query).then((r) => r[0])
    }

    const fetchMultiple = (
        params: IFeedParams,
        index: number = 1
    ): Promise<Article[]> => {
        const { section, searchTerm } = params
        let query = `&show-fields=thumbnail,trailText,headline&page-size=20&page=${index}`

        if (section && section !== 'latest') {
            query += '&section=' + section
        }
        if (searchTerm) {
            query += '&q=' + searchTerm
        }
        return _fetchFromApi(query)
    }

    const _fetchFromApi = async (query: string): Promise<Article[]> => {
        const url = API_URL + query + API_KEY
        return fetch(url)
            .then(async (response) => {
                if (response.ok) {
                    const json = await response.json()
                    return (json?.response?.results || [])
                        .filter(_isValid)
                        .map(_handleArticle)
                }
                throw new Error(response?.statusText)
            })
            .catch(() => {
                return []
            })
    }

    return { fetchMultiple, fetchSingle }
}

export default useApi
