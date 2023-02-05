import React, { ComponentProps } from 'react'
import { Article } from '../model/article'

const ImageRoll = ({ article }: { article: Article }) => {
    const [loading, setLoading] = React.useState(true)

    return (
        <div className="image-roll w-100">
            <i
                className="fa fa-globe"
                style={!loading ? { display: 'none' } : {}}
            />
            <div style={loading ? { display: 'none' } : {}}>
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
