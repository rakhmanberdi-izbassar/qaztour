
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Grid, Card, CardContent, Typography, CircularProgress, Box,
    Divider, Button, useMediaQuery, useTheme, CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GetAppIcon from '@mui/icons-material/GetApp';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ❗️default export ретінде алу керек

const MyBookingsPage = () => {
    const [tourBookings, setTourBookings] = useState([]);
    const [hotelBookings, setHotelBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const effectiveLang = i18n.language === 'kk' ? 'kz' : i18n.language;

    const showAlert = (severity, message) => alert(message);

    useEffect(() => {
        const fetchMyBookings = async () => {
            setLoading(true);
            setError(null);
            if (!userId || !token) {
                setError(t('my_bookings_page.auth_required'));
                setLoading(false);
                return;
            }
            try {
                const tourRes = await axios.get(`http://127.0.0.1:8000/api/bookings_tours/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const hotelRes = await axios.get(`http://127.0.0.1:8000/api/bookings/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTourBookings(tourRes.data?.bookings.map(b => ({ ...b, type: 'tour' })) || []);
                setHotelBookings(hotelRes.data?.bookings?.data.map(b => ({ ...b, type: 'hotel' })) || []);
            } catch (err) {
                console.error('My Bookings Page Error:', err.response ? err.response.data : err.message);
                setError(err.message || t('my_bookings_page.failed_to_load_bookings'));
            } finally {
                setLoading(false);
            }
        };
        fetchMyBookings();
    }, [userId, token, t, i18n.language]);

    const getBookingTitle = (b) => b.type === 'tour'
        ? b.tour?.[`name_${effectiveLang}`] || b.tour?.name_kz || b.tour?.name_en
        : b.hotel?.[`name_${effectiveLang}`] || b.hotel?.name_kz || b.hotel?.name_en || b.hotel?.name;

    const getBookingLocation = (b) => b.type === 'tour'
        ? b.tour?.location?.[`name_${effectiveLang}`] || b.tour?.location?.name_kz || b.tour?.location?.name_en
        : b.hotel?.[`address_${effectiveLang}`] || b.hotel?.address_kz || b.hotel?.address_en || b.hotel?.address;

    const getBookingDateRange = (b) => {
        const l = effectiveLang === 'kz' ? 'kk-KZ' : 'en-US';
        return b.type === 'tour'
            ? new Date(b.tour?.date || b.created_at).toLocaleDateString(l)
            : `${new Date(b.check_in_date).toLocaleDateString(l)} - ${new Date(b.check_out_date).toLocaleDateString(l)}`;
    };

    const getGuests = (b) => b.type === 'tour' ? b.seats : b.guests_count || b.number_of_guests;

    const navigateToDetail = (b) => navigate(b.type === 'tour' ? `/tour/${b.tour.id}` : `/hotels/${b.hotel.id}`);

    const handleDownloadReceipt = (booking) => {
        const doc = new jsPDF();

        doc.setFontSize(24);
        doc.text(t('my_bookings_page.receipt_title'), doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text('AVENTRA', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
        doc.text(t('my_bookings_page.receipt_contact_info_short'), doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`${t('my_bookings_page.receipt_booking_id')}: ${booking.id}`, 20, 50);

        const tableData = [
            [t('my_bookings_page.receipt_item'), t('my_bookings_page.receipt_value')],
        ];

        const formattedTotalPrice = booking.total_price
            ? `${parseFloat(booking.total_price).toLocaleString('kk-KZ')} KZT`
            : 'N/A';

        if (booking.type === 'tour') {
            tableData.push([t('my_bookings_page.receipt_type'), t('my_bookings_page.tour')]);
            tableData.push([t('my_bookings_page.receipt_name'), getBookingTitle(booking)]);
            tableData.push([t('my_bookings_page.receipt_location'), getBookingLocation(booking)]);
            tableData.push([t('my_bookings_page.receipt_date'), getBookingDateRange(booking)]);
        } else {
            tableData.push([t('my_bookings_page.receipt_type'), t('my_bookings_page.hotel')]);
            tableData.push([t('my_bookings_page.receipt_name'), getBookingTitle(booking)]);
            tableData.push([t('my_bookings_page.receipt_address'), getBookingLocation(booking)]);
            tableData.push([t('my_bookings_page.receipt_check_in_out'), getBookingDateRange(booking)]);
        }

        tableData.push([t('my_bookings_page.receipt_guests'), getGuests(booking)]);
        tableData.push([t('my_bookings_page.receipt_total_price'), formattedTotalPrice]);
        tableData.push([t('my_bookings_page.receipt_status'), t(`booking_room.status_${booking.status}`)]);
        tableData.push([t('my_bookings_page.receipt_booking_time'), new Date(booking.created_at).toLocaleString()]);

        autoTable(doc, {
            startY: 60,
            head: [tableData[0]],
            body: tableData.slice(1),
        });

        doc.save(`${booking.type}_booking_${booking.id}_receipt.pdf`);
        showAlert('success', t('my_bookings_page.download_successful'));
    };


    const renderBookingCard = (b) => (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                {b.type === 'tour' && b.tour?.image && (
                    <CardMedia component="img" image={`http://127.0.0.1:8000/storage/${encodeURIComponent(b.tour.image)}`} sx={{ borderRadius: 2, height: 120, mb: 1.5 }} />
                )}
                {b.type === 'hotel' && b.hotel?.image && (
                    <CardMedia component="img" image={`http://127.0.0.1:8000/storage/${encodeURIComponent(b.hotel.image)}`} sx={{ borderRadius: 2, height: 120, mb: 1.5 }} />
                )}
                <Typography variant="h6" fontWeight="bold">{getBookingTitle(b)}</Typography>
                <Typography variant="body2" color="text.secondary"><LocationOnIcon sx={{ fontSize: 16 }} /> {getBookingLocation(b)}</Typography>
                <Typography variant="body2" color="text.secondary"><CalendarTodayIcon sx={{ fontSize: 16 }} /> {getBookingDateRange(b)}</Typography>
                <Typography variant="body2" color="text.secondary"><AttachMoneyIcon sx={{ fontSize: 16 }} /> {parseFloat(b.total_price).toLocaleString('kk-KZ')} KZT</Typography>
                <Typography variant="body2" color="text.secondary">{t('my_bookings_page.guests')}: {getGuests(b)}</Typography>
                <Typography variant="body2" color="text.secondary">{t('my_bookings_page.status')}: {t(`booking_room.status_${b.status}`)}</Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                    <Button size="small" onClick={() => navigateToDetail(b)}>{t('my_bookings_page.view_details')}</Button>
                    {['confirmed', 'paid'].includes(b.status) && (
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<GetAppIcon />}
                            onClick={() => handleDownloadReceipt(b)}
                        >
                            {t('my_bookings_page.download_receipt')}
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                    <Typography ml={2}>{t('common.loading_bookings')}</Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center" mt={5}>
                {t('common.error')}: {error}
            </Typography>
        );
    }

    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={14}>
                {t('my_bookings_page.my_bookings_title')}
            </Typography>

            {tourBookings.length > 0 && (
                <>
                    <Typography variant="h6" fontWeight="bold" mt={4} mb={2}>{t('my_bookings_page.tour_bookings_title')}</Typography>
                    <Grid container spacing={3}>
                        {tourBookings.map(b => (
                            <Grid item xs={12} sm={6} md={4} key={`tour-${b.id}`}>
                                {renderBookingCard(b)}
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {hotelBookings.length > 0 && (
                <>
                    <Typography variant="h6" fontWeight="bold" mt={6} mb={2}>{t('my_bookings_page.hotel_bookings_title')}</Typography>
                    <Grid container spacing={3}>
                        {hotelBookings.map(b => (
                            <Grid item xs={12} sm={6} md={4} key={`hotel-${b.id}`}>
                                {renderBookingCard(b)}
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default MyBookingsPage;
