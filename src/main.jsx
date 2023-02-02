import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

// twin macro css settings
import GlobalStyles from './styles/GlobalStyles'
import './styles/Fonts.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <GlobalStyles />
    <App />
  </React.StrictMode>,
)
