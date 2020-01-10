import React, {ComponentProps} from 'react';
import Header from "../components/Header";
import ArticleTeaser from "../components/ArticleTeaser";
import FeedService from "../services/feed.service";
import debounce from "lodash.debounce";

interface IState {
    list?: Array<any>;
}

class Index extends React.Component<ComponentProps<any>, IState> {

    constructor(props: Readonly<ComponentProps<any>>) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {

        this.updateFeed();

        window.onscroll = debounce(async () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                await FeedService.loadNext();
                this.updateFeed();
            }
        }, 100);
    }

    componentWillUnmount() {
        window.onscroll = () => {
        };
    }

    async updateFeed() {

        this.setState({
            list: await FeedService.getFeed()
        });
    }

    render() {

        const items = (this.state.list || []).map((item, key) =>
            <div key={key} className={"col-sm-6 col-md-4"}>
                <ArticleTeaser
                    id={item.id}
                    date={item.webPublicationDate}
                    section={item.sectionName}
                    fields={item.fields}
                ></ArticleTeaser>
            </div>
        );

        return (
            <div>
                <Header/>
                <div className="container white-bg p-4">
                    <div className="row">
                        {items}
                    </div>
                    <div className="row my-5 white-bg">
                        <div className="col-12 text-center">
                            <div className="loader"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
