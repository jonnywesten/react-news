import React from 'react';
import {Link} from "react-router-dom";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);

interface IProps {
    id: string,
    date: string,
    section: string,
    fields: {
        headline: string,
        thumbnail: string,
        trailText: string,
        byline: string
    }
}

class ArticleTeaser extends React.Component<IProps> {

    render() {

        const fields = this.props.fields;

        // Add locale-specific relative date/time formatting rules.
        const date = new TimeAgo('en-US').format(new Date(this.props.date));

        //strip HTML tags from trailText
        const trailText = fields.trailText.replace(/<\/?[^>]+(>|$)/g, "");


        return (
            <Link to={'/article/' + this.props.id} style={{textDecoration: 'none', color: 'inherit'}}>

                <div className="img-container">
                    <img className="w-100" alt={fields.headline} src={fields.thumbnail}></img>
                    <div className="section-name w-100">{this.props.section}</div>
                </div>

                <h4 className="mt-2 mb-0 teaser-headline">
                    {fields.headline}
                </h4>
                <p className="mb-0">
                    <small className="text-muted font-italic">
                        {date}
                    </small>
                </p>
                <p className="mt-2 mb-4">
                    {trailText}
                </p>

            </Link>
        );
    }
}

export default ArticleTeaser;
