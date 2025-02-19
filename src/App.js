import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import ContactUs from './pages/ContactUs'
import './App.css'
import ToursPage from './pages/ToursPage'
import LoginPage from './pages/LoginPage'
import TourDetail from './components/TourDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/tour/:id" element={<TourDetail />} />
      </Routes>
    </Router>
  )
}

export default App
