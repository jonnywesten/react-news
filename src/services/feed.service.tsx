import ApiService from "./api.service";
import {Article} from "../model/article";

class FeedService {

    public static feed: Array<Article> = [];
    private static index = 0;
    private static searchTerm: string | undefined;
    private static sectionName: string | undefined;

    public static setParams(sectionName?: string, searchTerm?: string) {
        this.index = 0;
        this.feed = [];
        this.searchTerm = searchTerm;
        this.sectionName = sectionName;
    }

    public static async loadNext() {

        const apiResponse = await ApiService.getList(++this.index, this.sectionName, this.searchTerm);

        this.feed = this.feed.concat(apiResponse);
    }

    public static async getFeed(): Promise<Article[]> {

        if (this.feed.length === 0) {
            await this.loadNext();
        }

        return this.feed
    }
}

export default FeedService;
