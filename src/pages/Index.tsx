import React, {ComponentProps} from 'react';
import Header from "../components/Header";
import ArticleTeaser from "../components/ArticleTeaser";
import FeedService from "../services/feed.service";
import debounce from "lodash.debounce";

interface IState {
    feed?: Array<any>;
    endOfFeed?: boolean;
}

class Index extends React.Component<ComponentProps<any>, IState> {

    state: IState = {};

    shouldComponentUpdate(nextProps: Readonly<React.ComponentProps<any>>): boolean {

        const searchTerm = nextProps.match.params.searchTerm;
        const section = nextProps.match.params.section;

        if (searchTerm !== this.props.match.params.searchTerm ||
            section != this.props.match.params.section) {
            this.setSectionAndSearchTerm(section, searchTerm);
        }

        return true;
    }

    componentDidMount() {

        this.setSectionAndSearchTerm(
            this.props.match.params.section,
            this.props.match.params.searchTerm
        );

        window.onscroll = debounce(async () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                if(!this.state.endOfFeed) {
                    await FeedService.loadNext();
                    this.updateFeed();
                }
            }
        }, 100);
    }

    componentWillUnmount() {
        window.onscroll = () => {
        };
    }

    setSectionAndSearchTerm(
        section: string | undefined,
        searchTerm: string | undefined
    ){

        this.setState({
            feed: [],
            endOfFeed: false
        }, () => {
            FeedService.setSectionAndSearchTerm(section, searchTerm);
            this.updateFeed();
        });

    }

    async updateFeed() {

        const feed = await FeedService.getFeed();

        this.setState({
            feed: feed,
            endOfFeed: feed.length <= (this.state.feed || []).length || feed.length < 4
        });
    }

    render() {

        const searchTerm = this.props.match.params.searchTerm;

        return (
            <div>
                <Header/>
                <div className="container white-bg p-4">
                    <div className="row">
                        {(searchTerm) && <div className="col-12 mt-2 mb-5 text-bold">
                            <h2>
                                {`Showing results for search term '${searchTerm}':`}
                            </h2>
                        </div>}

                        {(this.state.feed || []).map((article, key) =>
                            <div key={key} className={"col-sm-6 col-md-4"}>
                                <ArticleTeaser
                                    id={article.id}
                                    date={article.webPublicationDate}
                                    section={article.sectionName}
                                    fields={article.fields}
                                />
                            </div>
                        )}
                    </div>
                    <div className="row my-5 white-bg">
                        {!this.state.endOfFeed &&
                        <div className="col-12 text-center">
                            <div className="loader"/>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
