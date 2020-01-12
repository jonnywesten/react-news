export class Article {
    id!: string;
    date!: string;
    sectionId!: string;
    sectionName!:string;
    type!: string;
    webPublicationDate!:string;
    timeAgo!: string;
    fields!: {
        headline: string;
        thumbnail: string;
        trailText: string;
        byline: string;
        body:string;
    }
}