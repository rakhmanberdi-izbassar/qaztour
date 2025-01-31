import * as React from 'react'
import { Container } from '@mui/material'
import Grid from '@mui/joy/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'

export default function TourCard() {
  return (
    <Container sx={{paddingBottom: 5}}>
      <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Tours Packages</h2>
          <p>Planning for a trip? We will organize your trip with the best places and within best budget!</p>
        </div>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 15, maxWidth: 345, mx: "auto", p: 2 }}>
              <div>
                <Typography variant="h6" fontWeight="bold">
                  Yosemite National Park
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  April 24 to May 02, 2021
                </Typography>
                <IconButton
                  aria-label="Bookmark Yosemite Park"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{
                    position: 'absolute',
                    top: '0.875rem',
                    right: '0.5rem',
                  }}
                >
                  <BookmarkAdd />
                </IconButton>
              </div>
              <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                  src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt="Yosemite National Park"
                />
              </AspectRatio>
              <CardContent orientation="horizontal">
                <div>
                  <Typography variant="body2">Total price:</Typography>
                  <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>
                    $2,900
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Yosemite Park"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
