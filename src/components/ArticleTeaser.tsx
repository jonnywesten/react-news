import React from 'react';
import {Link} from "react-router-dom";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);

interface IProps {
    id?:string
    fields:{
        headline: string,
        thumbnail:string,
        trailText:string,
        byline:string,
        lastModified:string
    }
}

class ArticleTeaser extends React.Component<IProps> {

    render() {

        const fields = this.props.fields;

        // Add locale-specific relative date/time formatting rules.
        const date = new TimeAgo('en-US').format(new Date(fields.lastModified))

        return (
             <Link to={'article/' + this.props.id}  style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className="w-100" alt={fields.headline} src={fields.thumbnail}/>
                <h4>
                    {fields.headline}
                </h4>
                <i>
                    {date}
                </i>
                <p>
                    {fields.trailText}
                </p>
            </Link>
        );
    }
}

export default ArticleTeaser;
