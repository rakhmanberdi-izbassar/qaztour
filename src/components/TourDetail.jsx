import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  Container,
  Button,
  Rating,
  Grid,
  Divider,
  ImageList,
  ImageListItem,
  Dialog,
  Avatar,
  styled,
  IconButton,
  CircularProgress,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import axios from 'axios'
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'
import ReviewForm from './ReviewForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Custom styled components
const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  color: theme.palette.success.main,
}))

const BookButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: 'bold',
}))

const DetailIconText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}))

const TourDetail = () => {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [reviews, setReviews] = useState([]) // Турдың пікірлері
  const [averageRating, setAverageRating] = useState(0) // Орташа рейтинг
  const navigate = useNavigate()
  const [galleryImages, setGalleryImages] = useState([])
  const BASE_URL = 'http://127.0.0.1:8000/storage/'
  const { t } = useTranslation()

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tours/${id}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        console.log('Detailed Tour Response:', response.data)
        setTour(response.data.tour) // ✅ Осы жол: response.data.tour-ды тікелей tour күйіне сақтаймыз
        setReviews(response.data.tour.reviews || [])
        console.log('Reviews:', response.data.tour.reviews)
        if (
          response.data.tour.reviews &&
          response.data.tour.reviews.length > 0
        ) {
          const totalRating = response.data.tour.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          )
          setAverageRating(totalRating / response.data.tour.reviews.length)
        } else {
          setAverageRating(0)
        } // Жаңа galleryImages массивін құру

        const imagesFromImages =
          response.data?.tour?.images?.map(
            (img) => BASE_URL + img.image_path
          ) || []
        const imagesFromGallery =
          response.data?.tour?.gallery?.map(getImageUrl) || []
        const mainImage = response.data?.tour?.image
          ? [getImageUrl(response.data.tour.image)]
          : []

        setGalleryImages([
          ...mainImage,
          ...imagesFromImages,
          ...imagesFromGallery,
        ])
      } catch (err) {
        console.error('Error fetching tour:', err)
        setError(err.message || 'Failed to fetch tour details')
      } finally {
        setLoading(false)
      }
    }
    fetchTour()
  }, [id])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return tourImg
    if (imagePath.startsWith('http')) return imagePath
    return `${BASE_URL}${imagePath}`
  }

  const handleOpen = (img) => {
    setSelectedImage(img)
    setOpen(true)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews])
    setAverageRating((prevRating) => {
      const total = prevRating * reviews.length + newReview.rating
      return total / (reviews.length + 1) || newReview.rating
    })
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
                Error: {error}     {' '}
      </Typography>
    )
  }

  if (!tour) {
    // ✅ Осы жол: !tour.tour емес, !tour
    return (
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', mt: 5, color: 'error.main' }}
      >
                Тур табылмады      {' '}
      </Typography>
    )
  }

  const locationName = tour.location?.name || 'Unknown'
  const userName = tour.user?.name || '—'

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '400px',
          background: `url(${getImageUrl(tour.image)}) center/cover no-repeat`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', p: 3, borderRadius: 2 }}>
          <Typography variant="h3" fontWeight="bold">
            {tour.name_kz}
          </Typography>
        </Box>
      </Box>
      <Container sx={{ py: 3 }}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleGoBack}>
                <ArrowBackIosIcon />
              </IconButton>
              <PriceTypography>₸ {tour.price}</PriceTypography>

              {tour.date && (
                <DetailIconText>
                  <AccessTimeIcon sx={{ color: 'gray', mr: 0.5 }} />
                  <Typography variant="body2">{tour.date} days</Typography>
                </DetailIconText>
              )}
              {/* Турдың түрі мен тілі туралы ақпарат API-де жоқ */}
              <DetailIconText>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: 'success.main', mr: 0.5 }}
                ></Typography>
              </DetailIconText>
              {/* <DetailIconText>
                <DateRangeIcon sx={{ color: 'gray', mr: 1 }} />
                <Typography variant="body2">Location: {date}</Typography>
              </DetailIconText> */}
              <DetailIconText>
                <LocationOnIcon sx={{ color: 'gray', mr: 1 }} />
                <Typography variant="body2">
                  {t('tour_detail_page.location')}: {locationName}
                </Typography>
              </DetailIconText>
            </Box>
            <BookButton
              variant="contained"
              color="success"
              onClick={() => navigate(`/hotels`)}
            >
               {t('tour_detail_page.hotels_and_reservations')}
            </BookButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t('tour_detail_page.overview')}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {tour.description_kz}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ mt: 3 }}
              >
                {t('tour_detail_page.tour_gallery')}
              </Typography>
              <ImageList
                variant="masonry"
                cols={2}
                gap={8}
                sx={{ width: '100%' }}
              >
                {galleryImages.map((img, index) => (
                  <ImageListItem
                    key={index}
                    onClick={() => handleOpen(img)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <img
                      src={img}
                      alt={`Gallery Image ${index + 1}`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.05)')
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = 'scale(1)')
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Divider sx={{ my: 3 }} />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/bookings/create/${id}`)}
                  sx={{ fontSize: '1.2rem', padding: '10px 20px' }}
                >
                  {t('tour_detail_page.booking_and_payment')}
                </Button>

              <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Full Size"
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </Dialog>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {t('tour_detail_page.customer_reviews')}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Rating
                  name="read-only"
                  value={averageRating}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary" ml={1}>
                  ({reviews.length} reviews)
                </Typography>
              </Box>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card
                    key={review.id}
                    sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1 }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      {tour?.tour?.user?.avatar && (
                        <Avatar
                          alt="Tour Guide"
                          src={`${BASE_URL}${tour.user.avatar}`}
                          sx={{ width: 30, height: 30, mr: 1 }}
                        />
                      )}
                      <Typography variant="subtitle2" fontWeight="bold">
                        {review.user?.name || 'Anonymous'}
                      </Typography>
                      {review.rating && (
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 'auto' }}
                      >
                        {new Date(review.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {review.content}
                    </Typography>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t('tour_detail_page.no_reviews_yet')}
                </Typography>
              )}
              <Divider sx={{ my: 3 }} />
              <ReviewForm tourId={id} onReviewAdded={handleNewReview} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, mt: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {t('tour_detail_page.tour_guide')}
                </Typography>
                <Box display="flex" alignItems="center" flexDirection="column">
                  {tour?.tour?.user?.avatar && (
                    <Avatar
                      alt="Tour Guide"
                      src={`http://localhost:8000${tour.user.avatar}`}
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                  )}
                  <Typography variant="subtitle1" fontWeight="bold">
                    {tour.user.name || 'Анықталмаған'}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Rating
                      name="read-only"
                      value={4.8}
                      precision={0.1}
                      readOnly
                      size="small"
                      sx={{ ml: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      ml={0.5}
                    >
                      4.8
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    5 тур
                  </Typography>
                </Box>
              </Card>
              {/*<Card sx={{ p: 2, mt: 3, boxShadow: 3 }}>*/}
              {/*  <Typography variant="h6" fontWeight="bold" gutterBottom>*/}
              {/*    {t('tour_detail_page.similar_tours')}*/}
              {/*  </Typography>*/}
              {/*  /!* Ұқсас турларды көрсету логикасы әлі қосылмаған *!/*/}
              {/*  <Grid container spacing={2}>*/}
              {/*    <Grid item xs={6}>*/}
              {/*      <Card>*/}
              {/*        <img*/}
              {/*          src="https://travosy.vercel.app/static/media/almaty-city-tour.c7b7935b.jpg"*/}
              {/*          alt="Almaty City Tour"*/}
              {/*          style={{ width: '100%', display: 'block' }}*/}
              {/*        />*/}
              {/*        <Box p={1} textAlign="center">*/}
              {/*          <Typography variant="subtitle2" fontWeight="bold">*/}
              {/*            Алматы қаласы*/}
              {/*          </Typography>*/}
              {/*          <Typography variant="caption">$50</Typography>*/}
              {/*        </Box>*/}
              {/*      </Card>*/}
              {/*    </Grid>*/}
              {/*    <Grid item xs={6}>*/}
              {/*      <Card>*/}
              {/*        <img*/}
              {/*          src="https://travosy.vercel.app/static/media/charyn-canyon.8c514287.jpg"*/}
              {/*          alt="Charyn Canyon"*/}
              {/*          style={{ width: '100%', display: 'block' }}*/}
              {/*        />*/}
              {/*        <Box p={1} textAlign="center">*/}
              {/*          <Typography variant="subtitle2" fontWeight="bold">*/}
              {/*            Шарын каньоны*/}
              {/*          </Typography>*/}
              {/*          <Typography variant="caption">$120</Typography>*/}
              {/*        </Box>*/}
              {/*      </Card>*/}
              {/*    </Grid>*/}
              {/*    <Grid item xs={6}>*/}
              {/*      <Card>*/}
              {/*        <img*/}
              {/*          src="https://travosy.vercel.app/static/media/nomadic-experience.9e9c6b6d.jpg"*/}
              {/*          alt="Nomadic Experience"*/}
              {/*          style={{ width: '100%', display: 'block' }}*/}
              {/*        />*/}
              {/*        <Box p={1} textAlign="center">*/}
              {/*          <Typography variant="subtitle2" fontWeight="bold">*/}
              {/*            Көшпелі тәжірибе*/}
              {/*          </Typography>*/}
              {/*          <Typography variant="caption">$150</Typography>*/}
              {/*        </Box>*/}
              {/*      </Card>*/}
              {/*    </Grid>*/}
              {/*    <Grid item xs={6}>*/}
              {/*      <Card>*/}
              {/*        <img*/}
              {/*          src="https://travosy.vercel.app/static/media/nomadic-culture.698b5a8c.jpg"*/}
              {/*          alt="Nomadic Culture"*/}
              {/*          style={{ width: '100%', display: 'block' }}*/}
              {/*        />*/}
              {/*        <Box p={1} textAlign="center">*/}
              {/*          <Typography variant="subtitle2" fontWeight="bold">*/}
              {/*            Көшпелілер мәдениеті*/}
              {/*          </Typography>*/}
              {/*          <Typography variant="caption">$130</Typography>*/}
              {/*        </Box>*/}
              {/*      </Card>*/}
              {/*    </Grid>*/}
              {/*  </Grid>*/}
              {/*</Card>*/}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default TourDetail
