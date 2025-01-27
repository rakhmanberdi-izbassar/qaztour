import * as React from "react";
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);


function SlideShow() {
  return (
    <>
      <div className='bg-image'>
      <Container fixed>
      <Box sx={{ flexGrow: 1, paddingTop: 50}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Item><h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, eos maxime quibusdam ipsa, modi placeat et optio sunt at unde veniam. Distinctio ea blanditiis quo laboriosam alias! Adipisci, laudantium dolorem.</h1></Item>
        </Grid>
        <Grid size={6}>
          <Item><Card variant="outlined">{card}</Card></Item>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </div>
    </>
  )
}

export default SlideShow
