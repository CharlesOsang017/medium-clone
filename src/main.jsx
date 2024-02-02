import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './context/Context.jsx'
import 'react-quill/dist/quill.bubble.css';
import 'react-tagsinput/react-tagsinput.css'
// import 'react-tagsinput/react-tagsinput.css'
render(
    <BrowserRouter>
    
      <Context>
        <App />  
      </Context>
    </BrowserRouter>
    , document.getElementById('app'))
