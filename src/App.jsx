import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AILandingPage from './pages/AILandingPage'
import AccessConfirmedAI from './pages/AccessConfirmedAI'
import AccessConfirmedQuote from './pages/AccessConfirmedQuote'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AiMUSE from './pages/AiMUSE'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ai" replace />} />
        <Route path="/ai" element={<AILandingPage />} />
        <Route path="/access-confirmed-ai" element={<AccessConfirmedAI />} />
        <Route path="/access-confirmed-quote" element={<AccessConfirmedQuote />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/aimuse" element={<AiMUSE />} />
        <Route path="*" element={<Navigate to="/ai" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
