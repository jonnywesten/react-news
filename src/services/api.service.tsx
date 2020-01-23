import {Article} from "../model/article";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);

class ApiService {

    private static apiUrl = "https://news.code-smart.com/api/";
    private static cache: { [key: string]: any } = {};

    static async getList(index: number, section?: string, searchTerm?: string): Promise<Article[]> {

        let params = "search?show-fields=thumbnail,trailText,headline&page-size=20&page=" + index;

        if (section) {
            params += "&section=" + section;
        }
        if (searchTerm) {
            params += "&q=" + searchTerm;
        }

        return this.loadArticles(params);
    }

    static async getArticle(id: string): Promise<Article> {

        const params = "search?show-fields=thumbnail,trailText,headline,byline,body&ids=" + id;

        return this.loadArticles(params).then(r => r[0]);
    }

    private static async loadArticles(params: string): Promise<Article[]> {

        const key = btoa(params);

        const apiResponse = this.cache[key] || await (async () => {
            this.cache[key] = await (await fetch(this.apiUrl + params)).json();
            return this.cache[key];
        })();

        return (apiResponse?.response?.results || [])
            .filter((el: Article) => {
                return el.type === "article" && !!el.fields.thumbnail;
            })
            .map((el: Article) => {

                // Add locale-specific relative date/time formatting rules.
                el.timeAgo = new TimeAgo('en-US').format(new Date(el.webPublicationDate));

                // Strip HTML tags from trailText
                el.fields.trailText = el.fields.trailText.replace(/<\/?[^>]+(>|$)/g, "");

                return el;
            });
    }
}

export default ApiService;
