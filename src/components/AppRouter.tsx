import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import FeedPage from '../pages/FeedPage'
import Article from '../pages/ArticlePage'

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={() => <Redirect to="/section/home" />}
                />
                <Route path="/search/:searchTerm" exact component={FeedPage} />
                <Route path="/section/:section" exact component={FeedPage} />
                <Route path="/article/:id+" component={Article} />
                <Route component={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    )
}

export default AppRouter
