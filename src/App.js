import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import ContactUs from './pages/ContactUs'
import GalleryPage from './pages/GalleryPage'
import './App.css'
import ToursPage from './pages/ToursPage'
import HotelBookingPage from './pages/HotelBookingPage'
import LoginPage from './pages/LoginPage'
import TourDetail from './components/TourDetail'
import ProfilePage from './pages/ProfilePage'
import ProviderPage from './components/Provider'
import VideoTravelPage from './pages/VideoTravelPage'
import EventsPage from './pages/EventsPage'
import EditProfilePage from './pages/EditProfilePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/hotel-booking" element={<HotelBookingPage />} />
        <Route path="/video-travel" element={<VideoTravelPage />} />
        <Route path="/provider/:id" element={<ProviderPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tour/:id" element={<TourDetail />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
