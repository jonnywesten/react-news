import React, {ComponentProps} from 'react';
import Header from "../components/Header";
import ApiService from "../services/api.service";
import ShareButtons from "../components/ShareButtons";
import {Article} from "../model/article";
import FeedService from "../services/feed.service";
import ArticleTeaser from "../components/ArticleTeaser";

interface IState {
    article: Article,
    related: Article[],
    loading: boolean
}

class ArticlePage extends React.Component<ComponentProps<any>, IState> {

    state = {
        article: new Article(),
        related: [],
        loading: true
    };

    componentDidMount() {

        const id = this.props.match.params.id;
        this.loadArticle(id);
    }

    shouldComponentUpdate(nextProps: Readonly<React.ComponentProps<any>>) {

        const id = nextProps.match.params.id;

        if (id !== this.props.match.params.id) {
            this.loadArticle(id);
        }
        return true;
    }

    async loadArticle(id: string) {

        this.setState({
            loading: true
        });

        const article = await ApiService.getArticle(id);

        if (article) {

            // Set page title
            if (article.fields.headline) {
                document.title = article.fields.headline + " | Code Smart News";
            }

            this.setState({
                loading: false,
                article: article
            }, this.loadRelated);

        } else {
            this.props.history.push('/');
        }
    }

    async loadRelated() {

        FeedService.setParams(this.state.article.sectionId);
        const feed = await FeedService.getFeed();
        const related = feed
            .filter(el => el.id !== this.state.article.id)
            .slice(0, 3);

        this.setState({
            related: related
        });
    }

    render() {

        const article = this.state.article;

        return (
            <div>
                <Header/>
                <div className="container white-bg article-container">

                    {!this.state.loading ?

                        <div className="inner py-5">

                            <h2 className="headline">{article.fields.headline}</h2>
                            <p className="byline text-muted">
                                {article.timeAgo + " by " + article.fields.byline}
                            </p>
                            <ShareButtons/>
                            <hr/>

                            <img className="w-100" alt={article.fields.headline} src={article.fields.thumbnail}/>
                            <div className="img-sub font-italic mb-4">
                                {article.fields.trailText}
                            </div>
                            <div className="text-justify"
                                 dangerouslySetInnerHTML={{__html: article.fields.body || ""}}/>
                            <hr/>

                            <h3 className="mt-5 mb-4">
                                {"More from " + article.sectionName}
                            </h3>
                            <div className="row">
                                {this.state.related.map((article, key) =>
                                    <div key={key} className={"col-sm-6 col-md-4"}>
                                        <ArticleTeaser article={article}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <div className="col-12 text-center py-5">
                            <div className="loader"/>
                        </div>}
                </div>
            </div>
        );
    }
}

export default ArticlePage;
