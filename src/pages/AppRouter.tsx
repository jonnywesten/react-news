import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Index from "./Index";
import Article from "./Article";

class AppRouter extends React.Component {

    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/section/:sectionName" exact component={Index}/>
                    <Route path="/article/:id+" component={Article}/>
                    <Route component={() => <Redirect to='/'/>}/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
