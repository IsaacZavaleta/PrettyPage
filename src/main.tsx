import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElem = document.getElementById('root')
if (!rootElem) throw new Error('Root element not found')
createRoot(rootElem).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

