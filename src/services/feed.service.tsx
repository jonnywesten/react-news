import RestService from "./rest.service";

class FeedService {

    public static feed: Array<any> = [];

    private static listIndex = 0;

    public static async loadNext(){

        this.listIndex++;
        this.feed = this.feed.concat(await RestService.getList(this.listIndex));
    }

    public static async getFeed(){

        if(this.feed.length === 0){
            await this.loadNext();
        }

        return this.feed.filter(el=>{
            return el.type === "article" && !!el.fields.thumbnail;
        });
    }
}

export default FeedService;
