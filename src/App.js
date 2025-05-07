import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContactUs from './pages/ContactUs'
import GalleryPage from './pages/GalleryPage'
import './App.css'
import ToursPage from './pages/ToursPage'
import HotelBookingPage from './pages/HotelBookingPage'
import LoginPage from './pages/LoginPage'
import TourDetailPage from './pages/TourDetailPage'
import ProfilePage from './pages/ProfilePage'
import ProviderPage from './components/Provider'
import VideoTravelPage from './pages/VideoTravelPage'
import EventsPage from './pages/EventsPage'
import EditProfilePage from './pages/EditProfilePage'
import { WeatherProvider } from './components/WeatherContext'
import { UserProvider } from './contexts/UserContext'
import SinglePostPage from './components/post/SinglePostPage'
import CreatePost from './components/post/CreatePost'
import BlogPages from './pages/BlogPage'

function App() {
  return (
    <Router>
      <UserProvider>
        <WeatherProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/hotel-booking" element={<HotelBookingPage />} />
            <Route path="/video-travel" element={<VideoTravelPage />} />
            <Route path="/provider/:id" element={<ProviderPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tour/:id" element={<TourDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/blogs" element={<BlogPages />} />
            <Route path="/blog-create" element={<CreatePost />} />
            <Route path="/blog/:postId" element={<SinglePostPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </WeatherProvider>
      </UserProvider>
    </Router>
  )
}

export default App
