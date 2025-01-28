import * as React from 'react'
import { Container } from '@mui/material'
import { styled } from '@mui/joy/styles'
import Sheet from '@mui/joy/Sheet'
import Grid from '@mui/joy/Grid'
import AspectRatio from '@mui/joy/AspectRatio'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined'

export default function DestinationCard() {
    const Item = styled(Sheet)(({ theme }) => ({
      backgroundColor: '#fff',
      ...theme.typography['body-sm'],
      padding: theme.spacing(1),
      textAlign: 'center',
      borderRadius: 4,
      color: theme.vars.palette.text.secondary,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.level1,
      }),
    }))
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card sx={{ width: 320 }}>
              <div>
                <Typography level="title-lg">Yosemite National Park</Typography>
                <Typography level="body-sm">
                  April 24 to May 02, 2021
                </Typography>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
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
                  alt=""
                />
              </AspectRatio>
              <CardContent orientation="horizontal">
                <div>
                  <Typography level="body-xs">Total price:</Typography>
                  <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>
                    $2,900
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
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
