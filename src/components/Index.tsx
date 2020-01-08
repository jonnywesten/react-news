import React, {ComponentProps} from 'react';
import Header from "./Header";
import ArticleTeaser from "./ArticleTeaser";
import RestService from "../services/rest.service";

interface IState {
    list?: Array<any>;
}

class Index extends React.Component<ComponentProps<any>, IState> {

    constructor(props: Readonly<ComponentProps<any>>) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {

        this.setState({
            list: await RestService.getList()
        })
    }

    render() {

        const items = (this.state.list || []).map((item, key) =>
            <div key={item.id} className="col-sm-6 col-md-4">
                <ArticleTeaser id={item.id} fields={item.fields}></ArticleTeaser>
            </div>
        );

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
