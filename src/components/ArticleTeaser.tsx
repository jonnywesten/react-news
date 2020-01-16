import React from 'react';
import {Link} from "react-router-dom";
import {Article} from "../model/article";
import ImageRoll from "./ImageRoll";


interface IProps {
    article: Article
}

class ArticleTeaser extends React.Component<IProps> {

    render() {

        const article = this.props.article;

        return (
            <Link to={'/article/' + article.id} style={{textDecoration: 'none', color: 'inherit'}}>

                <div className="teaser-img-container">
                    <ImageRoll article={article}/>
                </div>

                <h4 className="mt-2 mb-0 font-weight-bolder">
                    {article.fields.headline}
                </h4>
                <p className="mb-0">
                    <small className="text-muted font-italic">
                        {article.timeAgo}
                    </small>
                </p>
                <p className="mt-2 mb-4">
                    {article.fields.trailText}
                </p>
                <hr className="d-sm-none mb-3"/>
            </Link>
        );
    }
}

export default ArticleTeaser;
