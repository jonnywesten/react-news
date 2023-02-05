import React from 'react'
import Header from './Header'

const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <Header />
            <div className="container white-bg article-container ">
                <div className="white-bg px-4 pt-xs-2 pt-sm-3 pt-lg-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
