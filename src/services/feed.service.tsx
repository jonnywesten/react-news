import RestService from "./rest.service";

class FeedService {

    public static feed: Array<any> = [];
    public static sections = ["politics", "business", "culture", "society", "technology", "science", "sport"];

    private static index = 0;
    private static searchTerm: string | undefined;
    private static sectionName: string | undefined;

    public static setSectionAndSearchTerm(sectionName?: string, searchTerm?: string) {
        this.index = 0;
        this.feed = [];
        this.searchTerm = searchTerm;
        this.sectionName = sectionName;
    }

    public static async loadNext() {

        const apiResponse = await RestService.getList(++this.index, this.sectionName, this.searchTerm);

        if (apiResponse.status === "ok") {
            this.feed = this.feed.concat(apiResponse.results);
        }
    }

    public static async getFeed() {

        if (this.feed.length === 0) {
            await this.loadNext();
        }

        return this.feed.filter(el => {
            return el.type === "article" && !!el.fields.thumbnail;
        })
    }
}

export default FeedService;
