class RestService {

    private static apiUrl = "http://news.code-smart.com/";

    static async getList(index: number, section: string | undefined, searchTerm: string | undefined) {

        let params = "search?show-fields=thumbnail,trailText,headline,byline&page-size=20&page=" + index;

        if (section) {
            params += "&section=" + section;
        }

        if (searchTerm) {
            params += "&q=" + searchTerm;
        }

        const response = await (await fetch(this.apiUrl + params)).json();
        return response.response;
    }

    static async getArticle(id: string) {

        const params = "search?show-fields=thumbnail,trailText,headline,byline,body&ids=" + id;
        const response = await (await fetch(this.apiUrl + params)).json();
        return response.response.results[0];
    }


}

export default RestService;
