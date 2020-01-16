import React, {ComponentProps} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Form, Input} from "react-distributed-forms";

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

    hideNav = () => {
        this.setState({
            showNav: false
        });
    };

    onSearchBarKeyDown = (e: any) => {
        if (e.keyCode === 13 || e.charCode === 13) {
            this.submitSearch();
        }
    };

    submitSearch = () => {
        if (this.state.searchTerm) {
            this.hideNav();
            this.props.history.push('/search/' + encodeURIComponent(this.state.searchTerm));
        }
    };

    render() {

        const headerSections = ["home", "world", "politics", "business", "culture", "society", "technology", "science", "sport"];

        const navBarClass = (this.state.showNav ? "" : "collapse ");

        const isActive = (section: string) => {
            const path = window.location.pathname;
            return (section === "home" && path === "/") || path.includes(section);
        };

        return (
            <div>
                <div className="container header-container p-0">
                    <div className="jumbotron header-title mb-0 px-3 py-2 py-sm-3 p-md-4">
                        <Link to="/">
                            <h2 className="page-title">
                                <i  style={{fontSize:"110%"}}
                                    className="fa fa-globe mr-3"/>
                                Code Smart News</h2>
                        </Link>
                    </div>
                </div>

                <nav className={navBarClass + "show container navbar navbar-expand-lg navbar-dark py-0 px-0 px-md-4"}>
                    <button className="navbar-toggler pl-md-0" type="button" onClick={this.toggleNav}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={"navbar-collapse"}>
                        <ul className="navbar-nav">
                            {headerSections.map((section, key) =>
                                <li className={(isActive(section) ? "active " : "") + "nav-item"} key={key}>
                                    <Link className="nav-link pl-3 pl-md-1 pr-md-4 pr-xl-5 text-capitalize"
                                          onClick={this.hideNav}
                                          to={"/section/" + section}>{section}</Link>
                                </li>)}
                        </ul>
                    </div>
                    <div className="search-bar navbar-brand">
                        <Form binding={this}>
                            <div className="form-group input-group-sm has-search">
                                <Input name={"searchTerm"}
                                       className="form-control mr-5 mr-md-4"
                                       onKeyDown={this.onSearchBarKeyDown}
                                       placeholder="Search.."/>
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
