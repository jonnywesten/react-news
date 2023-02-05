import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const NavBar = () => {
    const history = useHistory()
    const [showNav, setShowNav] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')

    const onSearchBarKeyDown = (e: any) => {
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
    const isActive = (section: string) => {
        const path = window.location.pathname
        return path.includes(section)
    }
    const headerSections = [
        'all',
        'world',
        'politics',
        'business',
        'culture',
        'society',
        'technology',
        'science',
        'sport',
    ]

    return (
        <nav
            className={
                'show container navbar navbar-expand-lg navbar-dark py-0 ' +
                (!showNav && 'collapse')
            }
        >
            <button
                className="navbar-toggler pl-0"
                type="button"
                onClick={() => {
                    setShowNav(!showNav)
                }}
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className={'navbar-collapse'}>
                <ul className="navbar-nav">
                    {headerSections.map((section, key) => (
                        <li
                            className={
                                'nav-item ' + (isActive(section) && ' active')
                            }
                            key={key}
                        >
                            <Link
                                className="nav-link pl-3 pl-md-1 pr-md-4 pr-xl-5 text-capitalize"
                                onClick={() => setShowNav(false)}
                                to={'/section/' + section}
                            >
                                {section}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="search-bar navbar-brand">
                <div className="form-group input-group-sm has-search">
                    <input
                        name={'searchTerm'}
                        className="form-control"
                        onChange={(e: {
                            target: {
                                value: React.SetStateAction<any>
                            }
                        }) => setSearchTerm(e.target.value)}
                        onKeyDown={onSearchBarKeyDown}
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
