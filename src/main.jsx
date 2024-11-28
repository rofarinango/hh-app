import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HHApp } from './HHApp.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HHApp/>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
