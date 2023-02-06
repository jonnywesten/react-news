import React from 'react'
import { Article } from '../model'

const ImageRoll = ({ article }: { article: Article }) => {
    const [loading, setLoading] = React.useState(true)

    return (
        <div className="image-roll w-100">
            <i className={'fa fa-globe ' + !loading && 'd-none'} />
            <div className={loading ? 'd-none' : undefined}>
                <img
                    onLoad={() => setLoading(false)}
                    className="w-100"
                    alt={article.fields.headline}
                    src={article.fields.thumbnail}
                />
                <h5 className="section-name mb-0 w-100">
                    {article.sectionName}
                </h5>
            </div>
        </div>
    )
}

export default ImageRoll
