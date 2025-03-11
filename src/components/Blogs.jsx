import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, Box } from '@mui/material';

const blogs = [
  { title: 'Exploring the Mountains', image: 'https://source.unsplash.com/400x300/?mountains', description: 'Discover the beauty of mountain hiking and the best trails to explore.' },
  { title: 'City Adventures', image: 'https://source.unsplash.com/400x300/?city', description: 'Find the most exciting urban destinations for your next trip.' },
  { title: 'Beach Getaways', image: 'https://source.unsplash.com/400x300/?beach', description: 'Relax and unwind at the best beach resorts around the world.' },
];

const Blogs = () => {
  return (
    <Container sx={{ paddingY: 14}}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 5,
          background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
          color: 'white',
          borderRadius: '10px',
          marginBottom: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold">Welcome to Our Blog</Typography>
        <Typography variant="h6">Find inspiration for your next adventure</Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3, }}>
        <TextField label="Search blogs..." variant="outlined" sx={{ width: '50%' }} />
        <Button variant="contained" sx={{ marginLeft: 2, backgroundColor: '#1976d2', color: 'white' }}>Search</Button>
      </Box>

      {/* Blog Grid */}
      <Grid container spacing={3}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia component="img" height="200" image={blog.image} alt={blog.title} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">{blog.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;