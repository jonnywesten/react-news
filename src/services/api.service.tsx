import {Article} from "../model/article";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);

class ApiService {

    private static apiUrl = "https://news.code-smart.com/api/";

    static async getList(index: number, section: string | undefined, searchTerm: string | undefined): Promise<Article[]> {

        let params = "search?show-fields=thumbnail,trailText,headline&page-size=20&page=" + index;

        if (section) {
            params += "&section=" + section;
        }

        if (searchTerm) {
            params += "&q=" + searchTerm;
        }

        const apiResponse = await (await fetch(this.apiUrl + params)).json();

        if (apiResponse.response.status === "ok") {

            return this.parseArticles(apiResponse);

        } else {

            return [];
        }
    }

    static async getArticle(id: string): Promise<Article> {

        const params = "search?show-fields=thumbnail,trailText,headline,byline,body&ids=" + id;
        const apiResponse = await (await fetch(this.apiUrl + params)).json();
        return this.parseArticles(apiResponse)[0];
    }

    static parseArticles(response: any): Article[] {

        return response.response.results
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
