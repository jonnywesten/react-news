import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import Header from "./Header";

class Article extends React.Component<RouteComponentProps<any>> {

    render() {

        let id = this.props.match.params.id;

        return (
            <div>
                <Header/>

                <div className="container">
                    <h4>Article {id}</h4>
                    <Link to="/">Back</Link>
                </div>
            </div>
        );
    }
}

export default Article;