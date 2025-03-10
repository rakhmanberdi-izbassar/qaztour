import React, { useState } from 'react'
import {
  AppBar,
  Container,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import { NavLink } from 'react-router-dom'
import LogoImg from './../assets/photos/location.png'

const DynamicIsland = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 10,
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(255, 255, 255, 0.63)',
  borderRadius: '20px',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  width: '100%',
  maxWidth: '1200px',
  color: 'black',
}))

export default function Header() {
  const [pageTitleColor, setPageTitleColor] = useState('black')

  return (
    <AppBar position="fixed" color="transparent">
      <Container fixed>
        <DynamicIsland initial={{ height: 50 }}>
          <Button component={NavLink} to="/" sx={{ color: pageTitleColor }}>
            {/* <img src={LogoImg} alt="a logo" style={{ width: '80px' }} /> */}
            <Typography className="font-css" variant="h6">
              Aventra
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={3}>
            <Button
              component={NavLink}
              to="/auth"
              sx={{ color: pageTitleColor }}
            >
              Login
            </Button>
            <Button
              component={NavLink}
              to="/tours"
              sx={{ color: pageTitleColor }}
            >
              Tours
            </Button>
            <Button
              component={NavLink}
              to="/about"
              sx={{ color: pageTitleColor }}
            >
              About us
            </Button>
            <Button
              component={NavLink}
              to="/blog"
              sx={{ color: pageTitleColor }}
            >
              Blog
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              sx={{ color: pageTitleColor }}
            >
              Contact us
            </Button>
          </Stack>
          <IconButton>
            <Badge color="error">
              <SearchIcon />
            </Badge>
          </IconButton>
        </DynamicIsland>
      </Container>
    </AppBar>
  )
}
