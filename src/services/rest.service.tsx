
class RestService {

    private static apiUrl = "http://news.code-smart.com/";

    static async getList() {

        const params = "search?show-fields=thumbnail,trailText,headline,byline,lastModified&page-size=50&page=1";
        const response = await (await fetch(this.apiUrl + params)).json();
        return response.response.results
    }

    static async getArticle(id:string) {

        const params = "search?show-fields=thumbnail,trailText,headline,byline,lastModified,body&ids=" + id;
        const response = await (await fetch(this.apiUrl + params)).json();
        return response.response.results[0];
    }


}

export default RestService;
