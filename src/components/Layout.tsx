import React from 'react'
import Header from './Header'

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <Header />
            <div className="container white-bg article-container">
                {children}
            </div>
        </div>
    )
}

export default Layout
