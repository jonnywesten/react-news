import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import NavBar from './NavBar'

const Header = () => {
    return (
        <div className="fixed-header position-fixed">
            <div className={'container header-container p-0 '}>
                <div className="jumbotron header-title mb-0 px-3 p-3">
                    <Link to="/">
                        <h2 className="page-title">
                            <i
                                style={{ fontSize: '110%' }}
                                className="fa  fa-rss-square mr-3"
                            />
                            React News
                        </h2>
                    </Link>
                    <a
                        href="https://github.com/DanielElport/react-news"
                        target="_blank"
                        title="Fork me on GitHub!"
                    >
                        <h2
                            className="page-title position-absolute"
                            style={{ top: 15, right: 20 }}
                        >
                            <i
                                style={{ fontSize: '110%' }}
                                className="fa fa-github-square"
                            />
                        </h2>
                    </a>
                </div>
                <NavBar />
            </div>
        </div>
    )
}

export default withRouter(Header)
