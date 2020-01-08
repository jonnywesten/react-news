import React, {ComponentProps} from 'react';
import {Link} from "react-router-dom";
import Header from "./Header";
import RestService from "../services/rest.service";

interface IState {
    headline?: string,
    body?: string
}

class Article extends React.Component<ComponentProps<any>, IState> {

    constructor(props: Readonly<ComponentProps<any>>) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {

        const id = this.props.match.params.id;
        const article = await RestService.getArticle(id);

        console.log(article);

        if (!article) {

            this.props.history.push('/');

        } else {

            this.setState({
                headline: article.fields.headline,
                body: article.fields.body
            });
        }
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="container">

                    <Link to="/">Back</Link>

                    <h4>{this.state.headline}</h4>

                    <div dangerouslySetInnerHTML={{__html: this.state.body || ""}}>
                    </div>
                </div>
            </div>
        );
    }
}

export default Article;
