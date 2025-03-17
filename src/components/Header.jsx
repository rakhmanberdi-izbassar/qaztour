import React, { useState } from 'react';
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
  Popover,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const DynamicIsland = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1100,
  top: 10,
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '20px',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  backdropFilter: 'blur(12px)',
  width: '100%',
  maxWidth: '1200px',
  color: 'black',
}));

const cities = [
  { name: 'Алматы', icon: '🌄' },
  { name: 'Астана', icon: '🏙️' },
  { name: 'Шымкент', icon: '🌿' },
  { name: 'Ақтау', icon: '🌊' },
  { name: 'Қостанай', icon: '🌾' },
];

export default function Header() {
  const [pageTitleColor] = useState('black');
  const [exploreMenuEl, setExploreMenuEl] = useState(null);
  const [cityAnchorEl, setCityAnchorEl] = useState(null);
  const [userMenuEl, setUserMenuEl] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const handleMenuOpen = (event) => setExploreMenuEl(event.currentTarget);
  const handleMenuClose = () => setExploreMenuEl(null);

  const handleCityClick = (event) => setCityAnchorEl(event.currentTarget);
  const handleCityClose = () => setCityAnchorEl(null);
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    handleCityClose();
  };

  const handleUserMenuOpen = (event) => setUserMenuEl(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuEl(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container fixed>
        <DynamicIsland initial={{ height: 50 }} animate={{ height: 50 }}>
          <Button component={NavLink} to="/" sx={{ color: 'black' }}>
            <Typography variant="h6">Aventra</Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={3}>
            <Button component={NavLink} to="/" sx={{ color: 'black' }}>Басты</Button>
            <Button component={NavLink} to="/tours" sx={{ color: 'black' }}>Турлар</Button>
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
              anchorEl={exploreMenuEl}
              open={Boolean(exploreMenuEl)}
              onClose={handleMenuClose}
              onMouseLeave={handleMenuClose}
              disableScrollLock={true}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MenuItem component={NavLink} to="/gallery" onClick={handleMenuClose}>Галерея</MenuItem>
              <MenuItem component={NavLink} to="https://3dmapcentral.asia/kz/#h85/103.0/5.5/108.5" onClick={handleMenuClose}>3D Тур</MenuItem>
              <MenuItem component={NavLink} to="/events" onClick={handleMenuClose}>Оқиғалар</MenuItem>
              <MenuItem component={NavLink} to="/video-travel" onClick={handleMenuClose}>Бейне саяхаттар</MenuItem>
              <MenuItem component={NavLink} to="/blogs" onClick={handleMenuClose}>Блог</MenuItem>
            </Menu>
          </Stack>
          <Button
            variant="contained"
            onClick={handleCityClick}
            startIcon={<LocationOnIcon />}
            sx={{
              background: 'transparent',
              color: 'black',
              borderRadius: '15px',
              padding: '6px 16px',
              boxShadow: 'none',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            {selectedCity.icon} {selectedCity.name}
          </Button>

          <Popover
            open={Boolean(cityAnchorEl)}
            anchorEl={cityAnchorEl}
            onClose={handleCityClose}
            disableScrollLock={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Stack spacing={1} sx={{ p: 2 }}>
              {cities.map((city) => (
                <MenuItem
                  key={city.name}
                  onClick={() => handleCitySelect(city)}
                  sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {city.icon} {city.name}
                </MenuItem>
              ))}
            </Stack>
          </Popover>
          <IconButton>
            <Badge color="error">
              <SearchIcon />
            </Badge>
          </IconButton>
          <Button
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            sx={{ color: 'black', display: 'flex', alignItems: 'center' }}
          >
            <AccountCircleIcon />
          </Button>

          <Menu
            id="user-menu"
            anchorEl={userMenuEl}
            open={Boolean(userMenuEl)}
            onClose={handleUserMenuClose}
            disableScrollLock={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem component={NavLink} to="/profile" onClick={handleUserMenuClose}>Профиль</MenuItem>
            <MenuItem component={NavLink} to="/settings" onClick={handleUserMenuClose}>Баптаулар</MenuItem>
            <MenuItem component={NavLink} to="/auth" onClick={handleUserMenuClose}>Шығу</MenuItem>
          </Menu>
        </DynamicIsland>
      </Container>
    </AppBar>
  );
}