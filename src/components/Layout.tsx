import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'

const Layout = ({ children }: { children: JSX.Element }) => {
    const history = useHistory()
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [history.location])

    return (
        <div>
            <Header />
            <div className="container white-bg article-container px-sm-4">
                <div className="pt-2 pt-lg-3">{children}</div>
            </div>
        </div>
    )
}

export default Layout
