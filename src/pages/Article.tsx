import React, {ComponentProps} from 'react';
import Header from "../components/Header";
import RestService from "../services/rest.service";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ShareButtons from "../components/ShareButtons";

interface IState {
    article?: any,
    loading?: boolean
}

class Article extends React.Component<ComponentProps<any>, IState> {

    constructor(props: Readonly<ComponentProps<any>>) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async componentDidMount() {

        const id = this.props.match.params.id;
        const article = await RestService.getArticle(id);

        console.log(article);

        if (!article) {

            this.props.history.push('/');

        } else {

            this.setState({
                article: article,
                loading: false
            });
        }
    }

    render() {

        const article = this.state.article || {fields:{}};

        // Set page title
        document.title = article.fields.headline + "| Code Smart News" || "Code Smart News";

        // Add locale-specific relative date/time formatting rules.
        const date = new TimeAgo('en-US').format(new Date(article.webPublicationDate));

        //strip HTML tags from trailText
        const trailText = (article.fields.trailText || "").replace(/<\/?[^>]+(>|$)/g, "");

        return (
            <div>
                <Header/>
                <div className="container white-bg article-container">

                    {this.state.loading &&
                    <div className="col-12 text-center py-5">
                        <div className="loader"></div>
                    </div>}

                    {!this.state.loading &&
                    <div className="inner py-5">

                        <h2 className="headline">{article.fields.headline}</h2>

                        <p className="byline text-muted">
                            {date + " by " + article.fields.byline}
                        </p>

                        <ShareButtons/>
                        <hr/>

                        <img className="w-100" alt={article.fields.headline} src={article.fields.thumbnail}></img>
                        <div className="img-sub font-italic mb-4">
                            {trailText}
                        </div>


                        <div className="text-justify" dangerouslySetInnerHTML={{__html: article.fields.body || ""}}>
                        </div>
                        <hr/>
                    </div>
                    }

                </div>
            </div>
        );
    }
}

export default Article;
