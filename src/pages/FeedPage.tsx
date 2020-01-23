import React, {ComponentProps} from 'react';
import Header from "../components/Header";
import ArticleTeaser from "../components/ArticleTeaser";
import FeedService from "../services/feed.service";
import debounce from "lodash.debounce";
import {Article} from "../model/article";

interface IState {
    feed: Article[];
    loading: boolean;
}

class FeedPage extends React.Component<ComponentProps<any>, IState> {

    state = {
        feed: [],
        loading: true
    };

    componentDidMount() {

        this.setFeedParams(
            this.props.match.params.section,
            this.props.match.params.searchTerm
        );

        // Endless scroll
        window.onscroll = debounce(async () => {
            if ((window.innerHeight + document.documentElement.scrollTop
                    >= document.documentElement.offsetHeight - 240)
                && this.state.loading) {

                await FeedService.loadNext();
                this.updateFeed();
            }
        }, 100);
    }

    shouldComponentUpdate(nextProps: Readonly<React.ComponentProps<any>>): boolean {

        const searchTerm = nextProps.match.params.searchTerm;
        const section = nextProps.match.params.section;

        if (searchTerm !== this.props.match.params.searchTerm ||
            section !== this.props.match.params.section) {
            this.setFeedParams(section, searchTerm);
        }
        return true;
    }


    componentWillUnmount() {
        // Remove endless scroll listener
        window.onscroll = null;
    }

    setFeedParams(section?: string, searchTerm?: string) {

        //Set document title
        window.document.title = (searchTerm ? "Search | " : "") + "Code Smart News";
        if (section) {
            window.document.title = section.replace(/^\w/, c => c.toUpperCase()) + " | Code Smart News";
        }

        FeedService.setParams(section, searchTerm);

        this.setState({
            feed: [],
            loading: true
        }, this.updateFeed);

    }

    async updateFeed() {

        const feed = await FeedService.getFeed();

        this.setState({
            feed: feed,
            loading: !(feed.length <= this.state.feed.length || feed.length < 4)
        });
    }

    render() {

        const searchTerm = this.props.match.params.searchTerm;

        return (
            <div>
                <Header/>
                <div className="container white-bg p-4">
                    <div className="row">
                        {searchTerm && <div className="col-12 mt-2 mb-5 text-bold">
                            <h2>
                                {`Showing results for search term '${searchTerm}':`}
                            </h2>
                        </div>}

                        {this.state.feed.map((article, key) =>
                            <div key={key} className={"col-sm-6 col-md-4"}>
                                <ArticleTeaser article={article}/>
                            </div>
                        )}
                    </div>
                    <div className="row my-5 white-bg">
                        {this.state.loading &&
                        <div className="col-12 text-center">
                            <div className="loader"/>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedPage;
