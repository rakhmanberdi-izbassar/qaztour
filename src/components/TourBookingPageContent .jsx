import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TourBookingPageContent = () => {
  const { tourId } = useParams()
  const navigate = useNavigate()

  const [tour, setTour] = useState(null)
  const [seats, setSeats] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tours/${tourId}`)
      .then((res) => {
        setTour(res.data.tour)
        setLoading(false)
      })
      .catch(() => {
        setError('Турды жүктеу сәтсіз болды')
        setLoading(false)
      })
  }, [tourId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!tour) return
    setSubmitting(true)
    try {
      // CSRF cookie алу (Laravel Sanctum үшін)
      await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')

      // Token алу
      const token = localStorage.getItem('authToken')

      // Авторизацияланған POST сұраныс
      await axios.post(
        'http://127.0.0.1:8000/api/bookings_tours',
        {
          tour_id: tour.id,
          seats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Сәтті брондау -> басқа бетке өту
      navigate('/tour_bookings')
    } catch (err) {
      setError('Брондау сәтсіз аяқталды')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p>Жүктелуде...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Турды брондау: {tour.name}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Орын саны (қалдығы: {tour.volume}):
          <input
            type="number"
            min={1}
            max={tour.volume}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          {submitting ? 'Брондалып жатыр...' : 'Брондау'}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          {submitting ? 'Брондалып жатыр...' : 'Брондау'}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          {submitting ? 'Брондалып жатыр...' : 'Брондау'}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          {submitting ? 'Брондалып жатыр...' : 'Брондау'}
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Тур туралы ақпарат</h3>
        <p>
          <strong>Аты:</strong> {tour.name}
        </p>
        <p>
          <strong>Бағасы:</strong> {tour.price} ₸
        </p>
        <p>
          <strong>Күні:</strong> {new Date(tour.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Сипаттама:</strong> {tour.description}
        </p>
      </div>
    </div>
  )
}

export default TourBookingPageContent
