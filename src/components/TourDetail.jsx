import { useParams } from 'react-router-dom'
import { Box, Typography, Card, CardContent } from '@mui/material'
import itemData from './../components/ToursList'

const TourDetail = () => {
  const { id } = useParams()
  const item = itemData.find((tour) => tour.id === Number(id))

  // Егер элемент табылмаса, хабарлама көрсету
  if (!item) {
    return <Typography>Tour not found</Typography>
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
        <img src={item.img} alt={item.title} width="100%" />
        <CardContent>
          <Typography variant="h4">{item.title}</Typography>
          <Typography sx={{ mt: 2 }}>{item.Description}</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default TourDetail
