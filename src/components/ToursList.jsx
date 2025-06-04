import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'; // Әдепкі сурет
import { useTranslation } from 'react-i18next';


const ToursList = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]); // API-дан келген барлық турлар
  const [filteredTours, setFilteredTours] = useState([]); // Сүзгіден өткен және сұрыпталған турлар
  const [priceRange, setPriceRange] = useState([0, 500000]); // Баға диапазоны
  const [maxPrice, setMaxPrice] = useState(500000); // Динамикалық максималды баға
  const [selectedCategory, setSelectedCategory] = useState(''); // Санат сүзгісі
  const [selectedDuration, setSelectedDuration] = useState(''); // Ұзақтық сүзгісі
  const [searchQuery, setSearchQuery] = useState(''); // Іздеу жолы
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(''); // Сұрыптау кілті
  const [sortDirection, setSortDirection] = useState('asc'); // Сұрыптау бағыты

  const BASE_URL = 'http://127.0.0.1:8000/storage/';
  const { t, i18n } = useTranslation(); // ✅ i18n объектісін аламыз
  const currentLang = i18n.language; // Ағымдағы тіл

  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialDate = searchParams.get('date') || '';
  const initialPeople = searchParams.get('people') || '';
  const initialStartDate = searchParams.get('startDate') || '';
  const initialEndDate = searchParams.get('endDate') || '';

  // API-дан турларды жүктеу
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tours', { // api/tours/ емес, api/tours
          params: {
            search: initialSearch,
            date: initialDate,
            ...(initialPeople && { people: initialPeople }),
            startDate: initialStartDate,
            endDate: initialEndDate,
          },
        });
        console.log('API Response for Tours List:', response.data);

        // ✅ API жауабындағы тур деректерін дұрыс өңдейміз (response.data.data.data)
        const fetchedTours = response.data?.data?.data || [];
        setTours(fetchedTours);

        // Максималды бағаны анықтау
        const prices = fetchedTours.map(tour => Number(tour.price));
        if (prices.length > 0) {
          const calculatedMaxPrice = Math.max(...prices);
          setMaxPrice(calculatedMaxPrice);
          // Егер әдепкі диапазон максималдыдан үлкен болса, оны жаңарту
          if (priceRange[1] > calculatedMaxPrice) {
            setPriceRange([priceRange[0], calculatedMaxPrice]);
          }
        } else {
          setMaxPrice(500000); // Әдепкі мән
        }

      } catch (err) {
        console.error('Error fetching tours:', err);
        setError(err.message || t('tours_list_page.failed_to_fetch_tours')); // Локализация
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [initialSearch, initialDate, initialPeople, initialStartDate, initialEndDate, t]); // t-ны тәуелділікке қосу

  // Турларды сүзу және сұрыптау
  useEffect(() => {
    // effectiveLang-ты тілге байланысты name_kz/name_en таңдау үшін қолданамыз
    const effectiveLang = currentLang === 'kk' ? 'kz' : currentLang;

    const filterAndSort = () => {
      const filtered = tours.filter((tour) => {
        // ✅ Локализацияланған атау және сипаттама арқылы іздеу
        const localizedName = tour[`name_${effectiveLang}`] || tour.name_kz || tour.name_en || '';
        const localizedDescription = tour[`description_${effectiveLang}`] || tour.description_kz || tour.description_en || '';

        const matchesSearch = searchQuery
            ? localizedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            localizedDescription.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        const matchesCategory = selectedCategory ? (tour.category === selectedCategory) : true; // Категорияны API-дан тексеру керек

        const matchesDuration = selectedDuration
            ? selectedDuration === '1-3'
                ? (tour.duration >= 1 && tour.duration <= 3) // tour.duration API-да бар деп есептейміз
                : selectedDuration === '4-7'
                    ? (tour.duration >= 4 && tour.duration <= 7)
                    : selectedDuration === '7+'
                        ? (tour.duration > 7)
                        : true
            : true;

        const matchesPrice =
            Number(tour.price) >= priceRange[0] &&
            Number(tour.price) <= priceRange[1];

        const matchesPeople = initialPeople
            ? (tour.volume ? tour.volume >= Number(initialPeople) : true) // tour.volume API-да бар деп есептейміз
            : true;

        const matchesDateRange =
            initialStartDate && initialEndDate
                ? (new Date(tour.date) >= new Date(initialStartDate) &&
                    new Date(tour.date) <= new Date(initialEndDate))
                : true;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesDuration &&
            matchesPrice &&
            matchesPeople &&
            matchesDateRange
        );
      });

      const sorted = [...filtered].sort((a, b) => { // filtered массивін көшіріп аламыз
        let comparison = 0;
        const effectiveLang = currentLang === 'kk' ? 'kz' : currentLang;

        if (sortBy === 'price') {
          comparison = Number(a.price) - Number(b.price);
        } else if (sortBy === 'location') {
          // ✅ Локация атын локализациялап сұрыптау
          const locationA = a.location?.[`name_${effectiveLang}`] || a.location?.name_kz || a.location?.name_en || '';
          const locationB = b.location?.[`name_${effectiveLang}`] || b.location?.name_kz || b.location?.name_en || '';
          comparison = locationA.localeCompare(locationB);
        } else if (sortBy === 'date') {
          comparison = new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'name') {
          // ✅ Тур атауын локализациялап сұрыптау
          const nameA = a[`name_${effectiveLang}`] || a.name_kz || a.name_en || '';
          const nameB = b[`name_${effectiveLang}`] || b.name_kz || b.name_en || '';
          comparison = nameA.localeCompare(nameB);
        } else if (sortBy === 'rating') {
          comparison = calculateAverageRating(a.reviews) - calculateAverageRating(b.reviews);
        }
        return sortDirection === 'asc' ? comparison : comparison * -1;
      });
      setFilteredTours(sorted);
    };

    filterAndSort(); // Функцияны шақыру
  }, [
    tours,
    initialSearch,
    initialStartDate,
    initialEndDate,
    initialPeople,
    priceRange,
    selectedCategory,
    selectedDuration,
    searchQuery,
    sortBy,
    sortDirection,
    currentLang // ✅ Тіл өзгергенде сүзу мен сұрыптауды қайта орындау үшін
  ]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value);
      setSortDirection('asc');
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return tourImg;
    if (imagePath.startsWith('http')) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

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
    );
  }

  if (error) {
    return (
        <Typography
            variant="h6"
            sx={{ textAlign: 'center', mt: 5, color: 'error.main' }}
        >
          Error: {error}
        </Typography>
    );
  }

  // API-да name_kk жоқ, сондықтан i18n.language 'kk' болса, 'kz' деп өңдейміз
  const effectiveLang = currentLang === 'kk' ? 'kz' : currentLang;

  return (
      <>
        <Box marginBottom={3}>
          <img
              style={{ width: '100%', borderRadius: '10px' }}
              src={tourImg}
              alt={t('tours_list_page.tour_banner_alt')}
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
                      label={t('tours_list_page.search_tours')}
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      margin="normal"
                  />

                  <FormControl fullWidth margin="normal">
                    <InputLabel id="duration-select-label">
                      {t('tours_list_page.duration_days')}
                    </InputLabel>
                    <Select
                        labelId="duration-select-label"
                        value={selectedDuration}
                        onChange={handleDurationChange}
                        label={t('tours_list_page.duration_days')}
                    >
                      <MenuItem value="">{t('tours_list_page.all_durations')}</MenuItem>
                      <MenuItem value="1-3">1-3 {t('tours_list_page.days')}</MenuItem>
                      <MenuItem value="4-7">4-7 {t('tours_list_page.days')}</MenuItem>
                      <MenuItem value="7+">7+ {t('tours_list_page.days')}</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {t('tours_list_page.price_range')}: ₸{priceRange[0]} - ₸{priceRange[1]}
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={maxPrice} // ✅ Динамикалық максималды баға
                        step={10000}
                        valueLabelFormat={(value) => `₸${value}`}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel id="sort-by-label">
                      {t('tours_list_page.sort_by')}
                    </InputLabel>
                    <Select
                        labelId="sort-by-label"
                        value={sortBy}
                        onChange={handleSortChange}
                        label={t('tours_list_page.sort_by')}
                    >
                      <MenuItem value="">{t('tours_list_page.default')}</MenuItem>
                      <MenuItem value="name">{t('tours_list_page.name')}</MenuItem>
                      <MenuItem value="price">{t('tours_list_page.price')}</MenuItem>
                      <MenuItem value="date">{t('tours_list_page.date')}</MenuItem>
                      <MenuItem value="location">{t('tours_list_page.location')}</MenuItem>
                      <MenuItem value="rating">{t('tours_list_page.rating')}</MenuItem>
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
                                alt={tour[`name_${effectiveLang}`] || tour.name_en || tour.name_kz || t('tours_list_page.no_name')} // ✅ Локализацияланған alt мәтін
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  objectFit: 'cover',
                                  borderRadius: '10px',
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = tourImg;
                                }}
                            />
                          </ImageListItem>

                          <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                              {tour[`name_${effectiveLang}`] || tour.name_kz || tour.name_en || t('tours_list_page.no_name')} {/* ✅ Локализацияланған атау */}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                              {tour.location?.[`name_${effectiveLang}`] || tour.location?.name_kz || tour.location?.name_en || t('tours_list_page.unknown_location')} {/* ✅ Локализацияланған локация */}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5, mb: 1 }}
                            >
                              {tour[`description_${effectiveLang}`]?.length > 80 // ✅ Локализацияланған сипаттама
                                  ? `${(tour[`description_${effectiveLang}`] || tour.description_kz || tour.description_en || '').substring(0, 80)}...`
                                  : (tour[`description_${effectiveLang}`] || tour.description_kz || tour.description_en || t('tours_list_page.no_description'))}
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
                              {t('tours_list_page.date')}: {new Date(tour.date).toLocaleDateString(effectiveLang === 'kz' ? 'ru-RU' : 'en-US')} {/* ✅ Датаны локализациялау */}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ color: '#ff9800', fontWeight: 'bold', mt: 1 }}
                            >
                              ₸{parseFloat(tour.price).toLocaleString('kk-KZ')} {/* Баға форматы */}
                            </Typography>
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
                            {t('tours_list_page.no_tours_found_criteria')} {/* Локализация */}
                          </Typography>
                      )}
                    </Box>
                  </Container>
              )}
            </Grid>
          </Grid>
        </Container>
      </>
  );
};

export default ToursList;