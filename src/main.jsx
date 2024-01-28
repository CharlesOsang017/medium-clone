import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './context/Context.jsx'
import  { Toaster } from 'react-hot-toast';

render(
    <BrowserRouter>
    <Toaster />
      <Context>
        <App />  
      </Context>
    </BrowserRouter>
    , document.getElementById('app'))
