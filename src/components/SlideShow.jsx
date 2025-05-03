import * as React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Input from '@mui/joy/Input'
import SearchIcon from '@mui/icons-material/Search'
import { DateRangeIcon } from '@mui/x-date-pickers'
import FormLabel from '@mui/joy/FormLabel'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import VideocamIcon from '@mui/icons-material/Videocam'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2), // Кіші padding мәні
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.('dark', {
    backgroundColor: '#1A2027',
  }),
}))

const handleChange = (event, newValue) => {
  alert(`You chose "${newValue}"`)
}

function SlideShow() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [peopleCount, setPeopleCount] = useState('1')

  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Кіші экрандар үшін breakpoint

  const handleSearch = () => {
    const queryParams = new URLSearchParams()

    if (searchTerm && searchTerm.trim()) {
      queryParams.append('search', searchTerm.trim())
    }

    if (selectedDate) {
      queryParams.append('date', selectedDate)
    }

    if (peopleCount && !isNaN(peopleCount) && Number(peopleCount) > 0) {
      queryParams.append('people', peopleCount)
    }

    navigate(`/tours?${queryParams.toString()}`)
  }

  const card = (
    <React.Fragment>
      <CardContent
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          fontWeight="bold"
          sx={{ textAlign: 'center', pb: 2 }}
        >
          {' '}
          {/* Мәтін өлшемі кішірейді */}
          Баратын жеріңізді іздеңіз
        </Typography>

        <FormLabel>Іздеу:</FormLabel>
        <Input
          placeholder="Search..."
          startDecorator={<SearchIcon />}
          sx={{ borderRadius: 6, bgcolor: '#f5f5f5', p: 1 }}
        />

        <FormLabel>Күніңізді таңдаңыз:</FormLabel>
        <Input
          type="date"
          startDecorator={<DateRangeIcon />}
          sx={{ borderRadius: 6, bgcolor: '#f5f5f5', p: 1 }}
        />

        <FormLabel>Адам саны:</FormLabel>
        <Select
          defaultValue="1"
          onChange={handleChange}
          sx={{ borderRadius: 6 }}
        >
          {[...Array(5)].map((_, i) => (
            <Option key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </Option>
          ))}
        </Select>

        <Button
          onClick={handleSearch}
          sx={{
            width: '100%',
            backgroundColor: 'rgb(5, 127, 228)',
            color: 'white',
            borderRadius: 3,
            p: 1.5,
            fontSize: isMobile ? '0.9rem' : '1rem', // Кішірек шрифт өлшемі
            fontWeight: 'bold',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: 'rgb(4, 107, 198)' },
          }}
        >
          Іздеу
        </Button>
      </CardContent>
    </React.Fragment>
  )

  const themeTypography = createTheme({
    typography: {
      fontFamily: '"Bad Script", cursive',
      h3: {
        fontSize: isMobile ? '2rem' : '3rem', // Кішірек шрифт өлшемі
      },
      subtitle1: {
        fontSize: isMobile ? '1rem' : '1.125rem', // Кішірек шрифт өлшемі
      },
    },
  })

  return (
    <>
      <div className="bg-image">
        <Container fixed>
          <Box
            sx={{
              flexGrow: 1,
              paddingTop: isMobile ? 10 : 30, // Кішірек padding top
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Grid container spacing={isMobile ? 2 : 4}>
              {' '}
              {/* Кішірек spacing */}
              <Grid item xs={12} md={6}>
                {' '}
                {/* md breakpoint қосылды */}
                <Item
                  sx={{
                    color: 'white',
                    boxShadow: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    justifyContent: 'start',
                    textAlign: 'left',
                    padding: isMobile ? 1 : 2, // Кішірек padding
                  }}
                >
                  <ThemeProvider theme={themeTypography}>
                    <Typography className="font-css" variant="h3" gutterBottom>
                      Идеалды мекендерді табыңыз
                    </Typography>
                  </ThemeProvider>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
                  >
                    {' '}
                    {/* Кішірек шрифт өлшемі */}
                    <b>Қайда барғыңыз келеді?</b>
                  </Typography>
                  <Typography
                    color="grey"
                    variant="subtitle1"
                    fontSize={18}
                    gutterBottom
                    sx={{ fontSize: isMobile ? '1rem' : '1.125rem' }} // Кішірек шрифт өлшемі
                  >
                    Сапарды жоспарлап жатырсыз ба? Біз сіздің саяхатыңызды ең
                    жақсы орындармен және ең жақсы бюджетпен ұйымдастырамыз!
                  </Typography>
                  <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
                    {' '}
                    {/* Бағыт өзгереді */}
                    <Button
                      variant="contained"
                      size={isMobile ? 'small' : 'medium'}
                    >
                      View Packages
                    </Button>{' '}
                    {/* Кнопка өлшемі кішірейді */}
                    <IconButton
                      sx={{
                        backgroundColor: 'rgb(5, 127, 228)',
                        color: 'white',
                      }}
                      aria-label="video"
                      size={
                        isMobile ? 'small' : 'large'
                      } /* Иконка өлшемі кішірейді */
                    >
                      <VideocamIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                {' '}
                {/* md breakpoint қосылды */}
                <Item
                  sx={{
                    borderRadius: '25px',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: isMobile
                      ? '0px 2px 5px rgba(0, 0, 0, 0.1)'
                      : '0px 4px 10px rgba(0, 0, 0, 0.1)', // Кішірек көлеңке
                  }}
                >
                  <Card sx={{ borderRadius: 3 }} variant="outlined">
                    {' '}
                    {/* Card бұрыштары кішірейді */}
                    {card}
                  </Card>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '100px' : '200px', // Биіктік кішірейді
          mt: isMobile ? '-90px' : '-190px', // Жоғарғы margin кішірейді
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M-2.54,95.23 C222.63,199.84 369.35,37.02 501.97,99.19 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: 'none', fill: 'aliceblue' }}
          />
        </svg>
      </Box>
    </>
  )
}

export default SlideShow
