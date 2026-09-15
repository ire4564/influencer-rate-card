import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { detectLanguage, LanguageProvider } from './i18n/index.jsx'

const lang = detectLanguage()
document.documentElement.lang = lang

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider lang={lang}>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
