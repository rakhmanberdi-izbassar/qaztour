import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Container,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Header from './Header'; // Бұл компонент бар деп есептейміз
import Footer from './Footer'; // Бұл компонент бар деп есептейміз
import { useTranslation } from 'react-i18next'; // ✅ useTranslation импорты


const BookingRoom = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, severity: 'info', message: '' });
  const { t, i18n } = useTranslation(); // ✅ i18n объектісін аламыз

  // Хабарламаларды көрсету функциясы
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!bookingId) {
      showAlert('error', t('booking_room.error_booking_id_not_found')); // Локализация
      return;
    }

    if (!token) {
      showAlert('warning', t('booking_room.user_not_authorized')); // Локализация
      // navigate('/login'); // Қолданушы авторизациядан өтпесе, логин бетіне бағыттауға болады
      return;
    }

    axios
        .get(`http://127.0.0.1:8000/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // API жауабындағы құрылымға сәйкес booking дерегін алу
          // (Мысалы: response.data.booking немесе response.data.data.booking, API-ға байланысты)
          if (response.data.booking) { // response.data.booking деп болжаймыз
            setBooking(response.data.booking);
          } else {
            showAlert('error', t('booking_room.booking_details_not_found')); // Локализация
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Қате шықты:', error);
          showAlert('error', error.message || t('booking_room.failed_to_fetch_booking')); // Локализация
          setLoading(false);
        });
  }, [bookingId, t, i18n.language]); // ✅ i18n.language-ді тәуелділікке қосыңыз!

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

  if (!booking) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>{t('booking_room.booking_details_not_found')}</Typography>; // Локализация
  }

  const {
    hotel,
    room_type,
    check_in_date,
    check_out_date,
    guests_count,
    total_price,
    notes,
    status,
  } = booking;

  // API-да name_kk, address_kk, description_kk сияқты кілттер жоқ, сондықтан i18n.language 'kk' болса, 'kz' деп өңдейміз
  const effectiveLang = i18n.language === 'kk' ? 'kz' : i18n.language;

  // Қонақүй деректерін локализациялау
  const hotelName = hotel?.name || t('booking_room.no_name');
  const hotelAddress = hotel?.[`address_${effectiveLang}`] || hotel?.address_kz || hotel?.address_en || t('booking_room.unknown_address');
  const hotelDescription = hotel?.[`description_${effectiveLang}`] || hotel?.description_kz || hotel?.description_en || t('booking_room.no_description');
  const hotelCity = hotel?.city?.name || hotel?.city_id || t('booking_room.unknown_city'); // Егер city объектісі бар болса
  const hotelCountry = hotel?.country || t('booking_room.unknown_country');

  // Бөлме типінің деректерін локализациялау
  const roomTypeName = room_type?.[`name_${effectiveLang}`] || room_type?.name_kz || room_type?.name_en || t('booking_room.no_name_room');
  const roomTypeDescription = room_type?.[`description_${effectiveLang}`] || room_type?.description_kz || room_type?.description_en || t('booking_room.no_description_room');

  const handleCancelBooking = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      showAlert('warning', t('booking_room.user_not_authorized')); // Локализация
      return;
    }

    axios
        .post(
            `http://127.0.0.1:8000/api/bookings/${bookingId}/cancel`,
            { status: 'cancelled' },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        )
        .then((response) => {
          showAlert('success', t('booking_room.booking_cancelled_success')); // Локализация
          setBooking((prevBooking) => ({
            ...prevBooking,
            status: 'cancelled',
          }));

          navigate('/hotels/');
        })
        .catch((error) => {
          console.error('Қате шықты:', error);
          showAlert('error', error.message || t('booking_room.error_cancelling_booking')); // Локализация
        });
  };

  return (
      <>
        <Header />
        <Box sx={{ maxWidth: 1240, margin: 'auto', padding: 3, mt: 14 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                fontWeight="bold"
            >
              {t('booking_room.booking_details')}
            </Typography>

            {/* Қонақүй ақпараты */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {t('booking_room.hotel_information')}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                      component="img"
                      src={`http://localhost:8000/storage/${hotel?.image}`} // Optional chaining
                      alt={hotelName}
                      sx={{
                        width: '100%',
                        height: 250,
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold">{hotelName}</Typography>
                  <Typography variant="body1" gutterBottom>
                    {hotelDescription}
                  </Typography>
                  <Typography variant="body2">
                    {hotelAddress}, {hotelCity}, {hotelCountry}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.stars')}: {hotel?.stars || 'N/A'} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.price_per_night')}: {hotel?.price_per_night || 'N/A'} KZT {/* Локализация */}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Бөлме түрі */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {t('booking_room.room_type_heading')}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                      component="img"
                      src={`http://localhost:8000/storage/${room_type?.image}`} // Optional chaining
                      alt={roomTypeName}
                      sx={{
                        width: '100%',
                        height: 250,
                        borderRadius: 2,
                        objectFit: 'cover',
                      }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold">{roomTypeName}</Typography>
                  <Typography variant="body1" gutterBottom>
                    {roomTypeDescription}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_detail.max_guests')}: {room_type?.max_guests || 'N/A'} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_detail.available_rooms')}: {room_type?.available_rooms || 'N/A'} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.price_per_night')}: {room_type?.price_per_night || 'N/A'} KZT {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('booking_room.breakfast')}: {room_type?.has_breakfast ? t('booking_room.yes') : t('booking_room.no')} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('booking_room.wifi')}: {room_type?.has_wifi ? t('booking_room.yes') : t('booking_room.no')} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('booking_room.tv')}: {room_type?.has_tv ? t('booking_room.yes') : t('booking_room.no')} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('booking_room.air_conditioning')}: {room_type?.has_air_conditioning ? t('booking_room.yes') : t('booking_room.no')} {/* Локализация */}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Брондау детализациясы */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {t('booking_room.booking_details_heading')} {/* Локализация */}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2">
                    {t('hotel_booking_page.check_in_date')}: {new Date(check_in_date).toLocaleDateString(effectiveLang === 'kz' ? 'ru-RU' : 'en-US')} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.check_out_date')}: {new Date(check_out_date).toLocaleDateString(effectiveLang === 'kz' ? 'ru-RU' : 'en-US')} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.guests_count')}: {guests_count} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.notes_label')}: {notes || t('booking_room.none')} {/* Локализация */}
                  </Typography>
                  <Typography variant="body2">
                    {t('hotel_booking_page.status')}: {t(`booking_room.status_${status}`)} {/* Статусты локализациялау */}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {t('hotel_booking_page.total_price')}: {total_price} USD
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Төлеу батырмасы */}
            {status === 'pending' && (
                <Box mt={3} display="flex" gap={2}>
                  <Button
                      variant="contained"
                      color="error"
                      size="large"
                      fullWidth
                      sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
                      onClick={handleCancelBooking}
                  >
                    {t('hotel_booking_page.cencel')} {/* Локализация */}
                  </Button>

                  <Box sx={{ flexGrow: 1 }}>
                    <PayPalButtons
                        style={{ layout: 'horizontal' }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: total_price.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            showAlert('success', t('booking_room.payment_success_message', { name: details.payer.name.given_name })); // Локализация
                          });
                        }}
                        onError={(err) => {
                          console.error('PayPal төлем қатесі:', err);
                          showAlert('error', t('booking_room.payment_error_message')); // Локализация
                        }}
                    />
                  </Box>
                </Box>
            )}
          </Paper>
        </Box>
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={() => setAlert({ ...alert, open: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
              onClose={() => setAlert({ ...alert, open: false })}
              severity={alert.severity}
              sx={{ width: '100%' }}
              variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>

        <Footer />
      </>
  );
};

export default BookingRoom;