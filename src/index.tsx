import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import AppRouter from './components/AppRouter'
import * as serviceWorker from './serviceWorker'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
)

serviceWorker.unregister()
