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
  Menu,
  MenuItem,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import { NavLink } from 'react-router-dom'

const DynamicIsland = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1100, // Хедер басқа элементтердің үстінде тұрады
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
  const [pageTitleColor] = useState('black')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" color="transparent">
      <Container fixed>
        <DynamicIsland initial={{ height: 50 }}>
          <Button component={NavLink} to="/" sx={{ color: pageTitleColor }}>
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

            {/* ЗЕРТТЕУ (Explore) БӨЛІМІ */}
            <Button
              aria-controls="explore-menu"
              aria-haspopup="true"
              onMouseEnter={handleMenuOpen}
              sx={{ color: pageTitleColor }}
            >
              Зерттеу
            </Button>

            <Menu
              id="explore-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onMouseLeave={handleMenuClose}
              disableScrollLock={true} // Бұл мәзір ашылғанда скролл өзгермеуін қамтамасыз етеді
              MenuListProps={{
                'aria-labelledby': 'explore-menu',
                onMouseEnter: () => setAnchorEl(anchorEl), // Мәзір ашық күйінде қалсын
                onMouseLeave: handleMenuClose, // Курсор шыққанда жабылады
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem
                component={NavLink}
                to="/gallery"
                onClick={handleMenuClose}
              >
                Галерея
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="https://3dmapcentral.asia/kz/#h85/103.0/5.5/108.5"
                onClick={handleMenuClose}
              >
                3D Тур
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/events"
                onClick={handleMenuClose}
              >
                Оқиғалар
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/video-travel"
                onClick={handleMenuClose}
              >
                Бейне саяхаттар
              </MenuItem>
            </Menu>

            <Button
              component={NavLink}
              to="/blogs"
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
