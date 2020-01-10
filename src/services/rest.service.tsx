
class RestService {

    private static apiUrl = "http://news.code-smart.com/";

    static async getList(listIndex: number) {

        const params = "search?show-fields=thumbnail,trailText,headline,byline&page-size=20&page=" + listIndex;
        const response = await (await fetch(this.apiUrl + params)).json();
        return response.response.results
    }

    static async getArticle(id: string) {

        const params = "search?show-fields=thumbnail,trailText,headline,byline,body&ids=" + id;
        const response = await (await fetch(this.apiUrl + params)).json();
        return response.response.results[0];
    }


}

export default RestService;
