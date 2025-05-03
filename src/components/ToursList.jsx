import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Grid,
  Card,
  CardContent,
  ImageListItem,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  Slider,
} from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'

const ToursList = () => {
  const navigate = useNavigate()
  const [tours, setTours] = useState([])
  const [priceRange, setPriceRange] = useState([20, 100])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = 'http://127.0.0.1:8000/storage/'

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const date = searchParams.get('date') || ''
  const people = searchParams.get('people') || ''

  const [filteredTours, setFilteredTours] = useState([])

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tours/')
        console.log('API Response:', response.data.data.data)
        //  Дұрыс жолмен турлар массивін алу
        setTours(
          Array.isArray(response.data?.data?.data)
            ? response.data.data.data
            : []
        )
      } catch (err) {
        console.error('Error fetching tours:', err)
        setError(err.message || 'Failed to fetch tours')
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  useEffect(() => {
    const filtered = filterTours(tours, { search, date, people })
    setFilteredTours(filtered)
  }, [tours, search, date, people])

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  const filterTours = (tours, { search, date, people }) => {
    return tours.filter((tour) => {
      const matchesSearch = search
        ? tour.name.toLowerCase().includes(search.toLowerCase())
        : true

      const matchesDate = date ? true : true // Қосымша логика кейін жазылады

      const matchesPeople = people
        ? tour.max_people
          ? tour.max_people >= Number(people)
          : true // Егер max_people мүлдем жоқ болса — фильтрден өткізе салу
        : true

      console.log({
        name: tour.name,
        max_people: tour.max_people,
        matchesPeople,
      })

      return matchesSearch && matchesDate && matchesPeople
    })
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return tourImg // Егер сурет мүлдем жоқ болса
    if (imagePath.startsWith('http')) return imagePath // Егер толық URL болса
    return `${BASE_URL}${imagePath}` // Әйтпесе BASE_URL мен біріктіреміз
  }

  return (
    <>
      <Box marginBottom={3}>
        <img
          style={{ width: '100%', borderRadius: '10px' }}
          src={tourImg}
          alt="Tour Banner"
        />
      </Box>
      <Container>
        <Grid container spacing={3}>
          {/* Filters */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              position: 'sticky',
              top: 80,
              height: '100vh',
              overflowY: 'auto',
            }}
          >
            <Card
              sx={{
                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
                padding: 2,
                borderRadius: '15px',
              }}
            >
              <CardContent>
                <TextField
                  fullWidth
                  label="Search Tours"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  margin="normal"
                />
                {/* Category алып тастадым, API-де жоқ секілді */}
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="mountain">Mountain</MenuItem>
                    <MenuItem value="beach">Beach</MenuItem>
                    <MenuItem value="cultural">Cultural</MenuItem>
                    <MenuItem value="extreme">Extreme</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="duration-select-label">Duration</InputLabel>
                  <Select
                    labelId="duration-select-label"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    label="Duration"
                  >
                    <MenuItem value="">All Durations</MenuItem>
                    <MenuItem value="1-3">1-3 days</MenuItem>
                    <MenuItem value="4-7">4-7 days</MenuItem>
                    <MenuItem value="7+">7+ days</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="price-range-label">Price Range</InputLabel>
                  <Slider
                    labelId="price-range-label"
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={500}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ${priceRange[0]} - ${priceRange[1]}
                  </Typography>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          {/* Tours List */}
          <Grid item xs={12} md={9} container spacing={3}>
            {Array.isArray(tours) && filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <Grid item xs={12} sm={6} md={4} key={tour.id}>
                  <Card
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                    onClick={() => navigate(`/tour/${tour.id}`)}
                  >
                    <ImageListItem sx={{ mb: 0 }}>
                      <img
                        src={getImageUrl(tour.image)}
                        alt={tour.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = tourImg
                        }} // қате болса запасной сурет
                      />
                    </ImageListItem>

                    <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {tour.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tour.description.length > 100
                          ? `${tour.description.substring(0, 100)}...`
                          : tour.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: '#ff9800', fontWeight: 'bold', mt: 1 }}
                      >
                        ${tour.price}
                      </Typography>
                      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                        Explore Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary">
                  {loading
                    ? 'Loading tours...'
                    : error
                    ? 'Error: ' + error
                    : 'No tours found.'}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ToursList
