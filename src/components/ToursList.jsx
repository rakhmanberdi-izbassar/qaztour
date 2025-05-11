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
  CircularProgress,
  Rating,
} from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'

const ToursList = () => {
  const navigate = useNavigate()
  const [tours, setTours] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500000]) // Баға диапазонын API мәліметтеріне сәйкестендіріңіз
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = 'http://127.0.0.1:8000/storage/'

  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialDate = searchParams.get('date') || ''
  console.log('Initial Search:', initialSearch, initialDate)
  const initialPeople = searchParams.get('people') || ''
  const initialStartDate = searchParams.get('startDate') || ''
  const initialEndDate = searchParams.get('endDate') || ''

  const [filteredTours, setFilteredTours] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tours/', {
          params: {
            search: initialSearch,
            date: initialDate, // Бұл қазірдің өзінде бар
            ...(initialPeople && { people: initialPeople }),
            startDate: initialStartDate, // Жаңа параметр
            endDate: initialEndDate, // Жаңа параметр
          },
        })
        console.log('API Response with Filters:', response.data.data.data)
        setTours(response.data.data.data || [])
      } catch (err) {
        console.error('Error fetching tours:', err)
        setError(err.message || 'Failed to fetch tours')
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [
    initialSearch,
    initialDate,
    initialPeople,
    initialStartDate,
    initialEndDate,
  ])

  useEffect(() => {
    const filtered = filterTours(tours, {
      search: initialSearch,
      startDate: initialStartDate, // initialStartDate қолданыңыз
      endDate: initialEndDate, // initialEndDate қолданыңыз
      people: initialPeople,
      priceRange,
      category: selectedCategory,
      duration: selectedDuration,
      query: searchQuery,
    })

    const sorted = sortTours(filtered, sortBy, sortDirection)
    setFilteredTours(sorted)
  }, [
    tours,
    initialSearch,
    initialStartDate, // тәуелділікке қосыңыз
    initialEndDate, // тәуелділікке қосыңыз
    initialPeople,
    priceRange,
    selectedCategory,
    selectedDuration,
    searchQuery,
    sortBy,
    sortDirection,
  ])

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSortChange = (event) => {
    const value = event.target.value
    if (value === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(value)
      setSortDirection('asc')
    }
  }

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / reviews.length
  }

  const filterTours = (
    tours,
    { search, startDate, endDate, people, priceRange, duration, query }
  ) => {
    return tours.filter((tour) => {
      const matchesSearch = query
        ? tour.name.toLowerCase().includes(query.toLowerCase())
        : true

      const matchesCategory = true

      const matchesDuration = duration
        ? duration === '1-3'
          ? tour.duration >= 1 && tour.duration <= 3
          : duration === '4-7'
          ? tour.duration >= 4 && tour.duration <= 7
          : duration === '7+'
          ? tour.duration > 7
          : true
        : true

      const matchesPrice =
        Number(tour.price) >= priceRange[0] &&
        Number(tour.price) <= priceRange[1]

      const matchesPeople = people
        ? tour.volume
          ? tour.volume >= Number(people)
          : true
        : true

      const matchesDateRange =
        startDate && endDate
          ? new Date(tour.date) >= new Date(startDate) &&
            new Date(tour.date) <= new Date(endDate)
          : true

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDuration &&
        matchesPrice &&
        matchesPeople &&
        matchesDateRange
      )
    })
  }

  const sortTours = (tours, sortBy, sortDirection) => {
    if (!sortBy) return tours

    const sortedTours = [...tours]

    sortedTours.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'price') {
        comparison = Number(a.price) - Number(b.price)
      } else if (sortBy === 'location') {
        const locationA = a.location?.name || ''
        const locationB = b.location?.name || ''
        comparison = locationA.localeCompare(locationB)
      } else if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date)
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === 'rating') {
        comparison =
          calculateAverageRating(a.reviews) - calculateAverageRating(b.reviews)
      }
      return sortDirection === 'asc' ? comparison : comparison * -1
    })

    return sortedTours
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return tourImg
    if (imagePath.startsWith('http')) return imagePath
    return `${BASE_URL}${imagePath}`
  }

  if (loading) {
    return (
      <Container sx={{ paddingY: 14 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', mt: 5, color: 'error.main' }}
      >
        Error: {error}
      </Typography>
    )
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
                  onChange={handleSearchChange}
                  margin="normal"
                />

                {/* API-де категория жоқ */}
                {/* <FormControl fullWidth margin="normal">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="mountain">Mountain</MenuItem>
                    <MenuItem value="beach">Beach</MenuItem>
                    <MenuItem value="cultural">Cultural</MenuItem>
                    <MenuItem value="extreme">Extreme</MenuItem>
                  </Select>
                </FormControl> */}

                <FormControl fullWidth margin="normal">
                  <InputLabel id="duration-select-label">
                    Duration (Days)
                  </InputLabel>
                  <Select
                    labelId="duration-select-label"
                    value={selectedDuration}
                    onChange={handleDurationChange}
                    label="Duration (Days)"
                  >
                    <MenuItem value="">All Durations</MenuItem>
                    <MenuItem value="1-3">1-3</MenuItem>
                    <MenuItem value="4-7">4-7</MenuItem>
                    <MenuItem value="7+">7+</MenuItem>
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
                    max={500000} // API мәліметтеріне сәйкес өзгертіңіз
                    step={10000}
                    valueLabelFormat={(value) => `₸${value}`}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ₸{priceRange[0]} - ₸{priceRange[1]}
                  </Typography>
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="sort-by-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    value={sortBy}
                    onChange={handleSortChange}
                    label="Sort By"
                  >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="location">Location</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          {/* Tours List */}
          <Grid item xs={12} md={9} container spacing={3}>
            {Array.isArray(filteredTours) && filteredTours.length > 0 ? (
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
                        }}
                      />
                    </ImageListItem>

                    <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {tour.name}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {tour.location?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5, mb: 1 }}
                      >
                        {tour.description?.length > 80
                          ? `${tour.description.substring(0, 80)}...`
                          : tour.description}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <Rating
                          name={`tour-rating-${tour.id}`}
                          value={calculateAverageRating(tour.reviews)}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          ml={0.5}
                        >
                          ({tour.reviews?.length || 0})
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Date: {tour.date}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: '#ff9800', fontWeight: 'bold', mt: 1 }}
                      >
                        ₸{tour.price}
                      </Typography>
                      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                        Explore Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Container sx={{ paddingY: 14 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                  }}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Typography variant="h6" color="text.secondary">
                      No tours found matching your criteria.
                    </Typography>
                  )}
                </Box>
              </Container>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ToursList
