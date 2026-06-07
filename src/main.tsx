import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/gilda-display/400.css'
import '@fontsource/harmattan/latin-400.css'
import '@fontsource/harmattan/latin-ext-400.css'
import '@fontsource/instrument-sans/400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
