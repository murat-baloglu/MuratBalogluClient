import { BlogModel } from "./blog-model";
import { TitleAndDetailUrlModel } from "./common/title-and-detail-url-model";

export class BlogDetailModel {
    titlesAndDetailUrls: TitleAndDetailUrlModel[];
    title: string;
    context: string;
}
