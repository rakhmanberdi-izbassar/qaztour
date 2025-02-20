import React, { useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Slider,
  ImageListItem,
  Rating,
  Stack,
} from '@mui/material'
import FormLabel from '@mui/joy/FormLabel'
import tourImg from './../assets/photos/5ftsj0mn7lkw08ws40k4w4wss.jpg'
import { useNavigate } from 'react-router-dom'
import itemData from './../data_example'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

const minDistance = 10

function ToursList() {
  const navigate = useNavigate()
  const [value1, setValue1] = useState([20, 37])
  const [value2, setValue2] = useState([20, 37])

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance)
        setValue2([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue2([clamped - minDistance, clamped])
      }
    } else {
      setValue2(newValue)
    }
  }

  function valuetext(value) {
    return `${value}°C`
  }

  return (
    <>
      <div style={{ paddingBottom: '30px' }}>
        <img style={{ width: '100%' }} src={tourImg} alt="For back" />
      </div>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              md={4}
              sx={{
                position: 'sticky',
                top: 80,
                height: '100vh',
                overflowY: 'auto',
              }}
            >
              <Card
                sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.3)', minWidth: 275 }}
              >
                <CardContent>
                  <FormLabel>Price Filter</FormLabel>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      getAriaLabel={() => 'Minimum distance shift'}
                      value={value2}
                      onChange={handleChange2}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      disableSwap
                    />
                  </Box>
                  <FormLabel>Reviews</FormLabel>
                  <Stack spacing={1}>
                    <Rating name="size-medium" defaultValue={5} />
                    <Rating name="size-medium" defaultValue={4} />
                    <Rating name="size-medium" defaultValue={3} />
                    <Rating name="size-medium" defaultValue={2} />
                    <Rating name="size-medium" defaultValue={1} />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Контент (оң жақтағы жылжитын элементтер) */}
            <Grid item xs={6} md={8}>
              {itemData.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    minWidth: 275,
                    marginBottom: 5,
                  }}
                  onClick={() => navigate(`/tour/${item.id}`)} // ✅ id орнына item.id
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <ImageListItem
                          cols={item.cols || 1}
                          rows={item.rows || 1}
                        >
                          <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <p>{item.Description}</p>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default ToursList
