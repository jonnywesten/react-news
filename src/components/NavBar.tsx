import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const NavBar = () => {
    const history = useHistory()
    const [showNav, setShowNav] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const headerSections = [
        'latest',
        'world',
        'politics',
        'business',
        'culture',
        'society',
        'technology',
        'science',
        'sport',
    ]

    const onSearchChange = (e: {
        target: { value: React.SetStateAction<string> }
    }) => setSearchTerm(e.target.value)

    const onSearchKeyDown = (e: { keyCode: number; charCode: number }) => {
        if (e.keyCode === 13 || e.charCode === 13) {
            submitSearch()
        }
    }

    const submitSearch = () => {
        if (searchTerm) {
            setShowNav(false)
            history.push('/search/' + encodeURIComponent(searchTerm))
        }
    }

    return (
        <nav
            className={`show container navbar navbar-expand-lg navbar-dark py-0 ${
                !showNav && 'collapse'
            }`}
        >
            <button
                className="navbar-toggler pl-0"
                type="button"
                onClick={() => setShowNav(!showNav)}
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse">
                <ul className="navbar-nav">
                    {headerSections.map((section) => (
                        <li
                            className={`nav-item ${
                                window.location.pathname.includes(section) &&
                                'active'
                            }`}
                            key={section}
                        >
                            <Link
                                className="nav-link px-1 px-lg-3 px-xl-4 text-capitalize"
                                onClick={() => setShowNav(false)}
                                to={'/section/' + section}
                            >
                                {section}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="search-bar">
                <div className="has-search m-0">
                    <input
                        name={'searchTerm'}
                        className="form-control"
                        onChange={onSearchChange}
                        onKeyDown={onSearchKeyDown}
                        placeholder="Search.."
                    />
                    <div
                        className="fa fa-search form-control-feedback"
                        onClick={submitSearch}
                    />
                </div>
            </div>
        </nav>
    )
}

export default withRouter(NavBar)
