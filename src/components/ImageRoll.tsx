import React, {ComponentProps} from "react";

interface IState {
    loaded: boolean,
}

class ImageRoll extends React.Component<ComponentProps<any>, IState> {

    state = {loaded: false};

    showImage = () => {
        this.setState({loaded: true});
    }

    render() {

        const article = this.props.article;

        return (
            <div className="image-roll w-100">
                <i className="fa fa-globe" style={this.state.loaded ? {display: "none"} : {}}/>
                <div style={!this.state.loaded ? {display: "none"} : {}}>
                    <img onLoad={this.showImage}
                         className="w-100"
                         alt={article.fields.headline}
                         src={article.fields.thumbnail}/>
                    <h5 className="section-name mb-0 w-100">{article.sectionName}</h5>
                </div>
            </div>
        );
    }
}

export default ImageRoll;
