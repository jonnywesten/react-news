import React from 'react'
import Header from './Header'

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <Header />
            <div className="container white-bg article-container px-sm-4">
                <div className="pt-3 pt-lg-4">{children}</div>
            </div>
        </div>
    )
}

export default Layout
