import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import { Container, Typography, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Input from '@mui/joy/Input'
import MailIcon from '@mui/icons-material/Mail'
import Button from '@mui/material/Button'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Footer() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: '#fff',
    padding: theme.spacing(2),
    textAlign: 'left',
    boxShadow: 'none',
  }))

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #002569, #002569)',
        color: 'white',
        paddingTop: 12,
        paddingBottom: 10,
        mt: 5,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -110,
          left: 0,
          width: '100%',
          height: '120px',
          marginTop: '-1px',
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M-2.54,95.23 C222.63,199.84 369.35,37.02 501.97,99.19 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: 'none', fill: '#002569' }}
          />
        </svg>
      </Box>

      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Typography variant="h6" fontWeight={600}>
                Біз туралы
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Саяхат жоспарлап жүрсіз бе? Біз сіздің сапарыңызды ең үздік
                орындармен және тиімді бюджетпен ұйымдастырамыз!
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Typography variant="h6" fontWeight={600}>
                Кеңсе
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                QazTour Турлар және Саяхаттар
                <br />
                C/54 Northwest Freeway,
                <br />
                558-офис, Хьюстон, АҚШ 485
                <br />
                contact@example.com
                <br />
                +152 534-468-854
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Typography variant="h6" fontWeight={600}>
                Компания
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Біз туралы
                <br />
                Қызметтер
                <br />
                Команда
                <br />
                Бағалар
                <br />
                Блог
                <br />
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item>
              <Typography variant="h6" fontWeight={600}>
                Жаңалықтарға жазылу
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Соңғы кеңестер мен жаңалықтарды электронды пошта арқылы алыңыз.
              </Typography>
              <Box
                sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}
              >
                <Input
                  startDecorator={<MailIcon />}
                  placeholder="Электронды поштаңыз"
                  sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    padding: '8px',
                    '&:focus': {
                      borderColor: '#ff9800',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    width: 200,
                    background: 'linear-gradient(135deg, #ff9800, #ff7300)',
                    color: '#fff',
                    borderRadius: 3,
                    '&:hover': {
                      background: '#ff9800',
                    },
                  }}
                >
                  Жазылу
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <IconButton sx={{ color: 'white' }}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <TwitterIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <InstagramIcon />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <LinkedInIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 4, opacity: 0.6 }}
        >
          &copy; {new Date().getFullYear()} QazTour. Барлық құқықтар қорғалған.
        </Typography>
      </Container>
    </Box>
  )
}
