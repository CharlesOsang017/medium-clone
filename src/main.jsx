import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './context/Context.jsx'

render(
    <BrowserRouter>
      <Context>
      <App />  
      </Context>
    </BrowserRouter>
    , document.getElementById('app'))
