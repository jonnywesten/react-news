import React, {ComponentProps} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Form, Input} from "react-distributed-forms";
import FeedService from "../services/feed.service";

interface IState {
    showNav: boolean,
    searchTerm: string,
}

class Header extends React.Component<ComponentProps<any>, IState> {

    state = {
        showNav: false,
        searchTerm: ""
    };

    toggleNav = () => {
        this.setState({
            showNav: !this.state.showNav
        });
    };

    onSearchbarKeyDown = (e: any) => {
        if (e.keyCode === 13 || e.charCode === 13) {
            this.submitSearch();
        }
    };

    submitSearch = () => {
        this.props.history.push('/search/' + encodeURIComponent(this.state.searchTerm));
    };

    render() {

        const navLinkClass= "nav-link pl-3 pl-md-1 pr-md-3 pr-xl-5 text-capitalize";
        const path = window.location.pathname;

        return (
            <div>
                <div className="container header-container p-0">
                    <Link to="/" style={{textDecoration: "none"}}>
                        <h2 className="jumbotron header-title mb-0">Code-Smart News</h2>
                    </Link>
                </div>

                <nav className={(this.state.showNav ? "" : "collapse ") + "show container navbar navbar-expand-lg navbar-dark py-0 px-0 px-md-4"}>
                    <button className="navbar-toggler" type="button" onClick={this.toggleNav}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={"navbar-collapse"}>
                        <ul className="navbar-nav">

                            <li className={path === "/" ? "active " : "" + "nav-item"}>
                                <Link onClick={()=>{this.setState({showNav:false})}}
                                    className={navLinkClass} to="/">Home</Link>
                            </li>

                            {(FeedService.sections).map((section, key) =>
                                <li className={path.endsWith(section) ? "active " : "" + "nav-item"} key={key}>
                                    <Link className={navLinkClass}
                                          onClick={()=>{this.setState({showNav:false})}}
                                          to={"/section/"+section}>{section}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="search-bar navbar-brand">
                        <Form binding={this}>
                            <div className="form-group input-group-sm has-search">
                                <Input name={"searchTerm"}
                                       className="form-control mr-5 mr-md-4"
                                       onKeyDown={this.onSearchbarKeyDown}
                                       placeholder="Search"/>
                                <div className="fa fa-search form-control-feedback"
                                     onClick={this.submitSearch}/>
                            </div>
                        </Form>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header);
