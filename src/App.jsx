import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ClaudeLandingPage from './pages/ClaudeLandingPage'
import ThankYouClaude from './pages/ThankYouClaude'
import ThankYouQuote from './pages/ThankYouQuote'
import PrivacyPolicy from './pages/PrivacyPolicy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/claude" replace />} />
        <Route path="/claude" element={<ClaudeLandingPage />} />
        <Route path="/thankyou-claude" element={<ThankYouClaude />} />
        <Route path="/thankyou-quote" element={<ThankYouQuote />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/claude" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
