import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import FeedPage from "../pages/FeedPage";
import Article from "../pages/ArticlePage";

class AppRouter extends React.Component {

    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={FeedPage}/>
                    <Route path="/search/:searchTerm" exact component={FeedPage}/>
                    <Route path="/section/home" exact component={() => <Redirect to='/'/>}/>
                    <Route path="/section/:section" exact component={FeedPage}/>
                    <Route path="/article/:id+" component={Article}/>
                    <Route component={() => <Redirect to='/'/>}/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
