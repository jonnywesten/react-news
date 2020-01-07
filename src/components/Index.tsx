import React from 'react';
import {Link} from "react-router-dom";
import Header from "./Header";

class Index extends React.Component {

    componentDidMount() {

        /*fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch(console.log)*/
    }

    render() {
        return (
            <div>
                <Header/>
                <ul>
                    <li><Link to="/article/1">Article 1</Link></li>
                    <li><Link to="/article/2">Article 2</Link></li>
                </ul>
            </div>
        );
    }
}

export default Index;