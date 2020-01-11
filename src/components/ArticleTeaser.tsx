import React from 'react';
import {Link} from "react-router-dom";
import {Article} from "../model/article";

interface IProps {
    article: Article
}

class ArticleTeaser extends React.Component<IProps> {

    render() {

        const article = this.props.article;

        return (
            <Link to={'/article/' + article.id} style={{textDecoration: 'none', color: 'inherit'}}>

                <div className="teaser-img-container">
                    <img className="w-100" alt={article.fields.headline} src={article.fields.thumbnail}></img>
                    <h5 className="section-name mb-0 w-100">{article.sectionName}</h5>
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
