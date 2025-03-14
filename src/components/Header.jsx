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
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const DynamicIsland = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1100,
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
  const [userMenuEl, setUserMenuEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleUserMenuOpen = (event) => {
    setUserMenuEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuEl(null)
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
            <Button component={NavLink} to="/" sx={{ color: pageTitleColor }}>
              Басты
            </Button>
            <Button
              component={NavLink}
              to="/tours"
              sx={{ color: pageTitleColor }}
            >
              Турлар
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
              disableScrollLock={true}
              MenuListProps={{
                'aria-labelledby': 'explore-menu',
                onMouseEnter: () => setAnchorEl(anchorEl),
                onMouseLeave: handleMenuClose,
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
              Блог
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              sx={{ color: pageTitleColor }}
            >
              Бізбен байланыс
            </Button>
          </Stack>

          <IconButton>
            <Badge color="error">
              <SearchIcon />
            </Badge>
          </IconButton>

          {/* Пайдаланушы мәзірі */}
          <Button
            aria-controls="user-menu"
            aria-haspopup="true"
            onMouseEnter={handleUserMenuOpen}
            sx={{
              color: pageTitleColor,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AccountCircleIcon />
          </Button>

          <Menu
            id="user-menu"
            anchorEl={userMenuEl}
            open={Boolean(userMenuEl)}
            onClose={handleUserMenuClose}
            onMouseLeave={handleUserMenuClose}
            disableScrollLock={true}
            MenuListProps={{
              'aria-labelledby': 'user-menu',
              onMouseEnter: () => setUserMenuEl(userMenuEl),
              onMouseLeave: handleUserMenuClose,
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              component={NavLink}
              to="/profile"
              onClick={handleUserMenuClose}
            >
              Профиль
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/settings"
              onClick={handleUserMenuClose}
            >
              Баптаулар
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/auth"
              onClick={handleUserMenuClose}
            >
              Шығу
            </MenuItem>
          </Menu>
        </DynamicIsland>
      </Container>
    </AppBar>
  )
}
