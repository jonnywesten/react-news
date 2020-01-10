import React, {ComponentProps} from 'react';
import {Link} from "react-router-dom";

interface IState {
    showNav: boolean
}

class Header extends React.Component<ComponentProps<any>, IState> {

    state = {showNav: false}

    toggleNav = () => {

        this.setState({
            showNav: !this.state.showNav
        });
    };


    render() {
        return (
            <div>
                <div className="container header-container p-0">
                    <Link to="/" style={{textDecoration: "none"}}>
                        <h2 className="jumbotron header-title mb-0">Code-Smart News</h2>
                    </Link>
                </div>

                <nav className={(this.state.showNav ? "" : "collapse ") + "show container navbar navbar-expand-md navbar-dark bg-dark py-0 px-0 px-md-4"}>
                    <button className="navbar-toggler" type="button" onClick={this.toggleNav}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={"navbar-collapse"}>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link pl-3 pl-md-1 pr-lg-5" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pl-3 pl-md-1 pr-lg-5" href="#">Features</a>
                            </li>

                     </ul>
                    </div>
                    <div className="search-bar navbar-brand">
                        <div className="form-group input-group-sm has-search">
                            <div className="fa fa-search form-control-feedback"></div>
                            <input type="text" className="form-control mr-2 mr-md-5" placeholder="Search"/>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;