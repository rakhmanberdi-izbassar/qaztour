import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
  Popover,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import { useWeather } from "./WeatherContext";

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
  justifyContent: 'space-between',
  gap: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  backdropFilter: 'blur(12px)',
  width: '95%',
  maxWidth: '1200px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 12px',
    gap: '8px',
  },
}));

const MobileMenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
}));

const cities = [
  { name: "Алматы", icon: "🌄", lat: 43.238949, lon: 76.889709 },
  { name: "Астана", icon: "🏙️", lat: 51.1605, lon: 71.4704 },
  { name: "Шымкент", icon: "🌿", lat: 42.32, lon: 69.595 },
  { name: "Ақтау", icon: "🌊", lat: 43.652, lon: 51.197 },
  { name: "Қостанай", icon: "🌾", lat: 53.219, lon: 63.628 },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [pageTitleColor] = useState("black");
  const [exploreMenuEl, setExploreMenuEl] = useState(null);
  const [cityAnchorEl, setCityAnchorEl] = useState(null);
  const [userMenuEl, setUserMenuEl] = useState(null);
  const [mobileMenuEl, setMobileMenuEl] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const { weather, fetchWeather } = useWeather();

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

  const handleMobileMenuOpen = (event) => setMobileMenuEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuEl(null);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity.lat, selectedCity.lon);
    }
  }, [selectedCity]);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container fixed>
        <DynamicIsland initial={{ height: 50 }} animate={{ height: 50 }}>
          {isMobile ? (
            <>
              <IconButton onClick={handleMobileMenuOpen} sx={{ color: "black" }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuEl}
                open={Boolean(mobileMenuEl)}
                onClose={handleMobileMenuClose}
                PaperProps={{
                  style: {
                    width: '80%',
                    maxWidth: '300px',
                    borderRadius: '12px',
                  },
                }}
              >
                <MobileMenuContainer>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="/"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    Басты
                  </Button>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="/tours"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    Турлар
                  </Button>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="/gallery"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    Галерея
                  </Button>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="https://3dmapcentral.asia/kz/#h85/103.0/5.5/108.5"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    3D Тур
                  </Button>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="/events"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    Оқиғалар
                  </Button>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="/video-travel"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    Бейне саяхаттар
                  </Button>
                  <Button
                    fullWidth
                    component={NavLink}
                    to="/blogs"
                    onClick={handleMobileMenuClose}
                    sx={{ color: "black", justifyContent: 'flex-start' }}
                  >
                    Блог
                  </Button>
                </MobileMenuContainer>
              </Menu>
            </>
          ) : (
            <Button component={NavLink} to="/" sx={{ color: "black" }}>
              <Typography variant="h6">Aventra</Typography>
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                component={NavLink}
                to="/"
                sx={{ color: "black", fontSize: "14px" }}
              >
                Басты
              </Button>
              <Button
                component={NavLink}
                to="/tours"
                sx={{ color: "black", fontSize: "14px" }}
              >
                Турлар
              </Button>
              <Button
                aria-controls="explore-menu"
                aria-haspopup="true"
                onMouseEnter={handleMenuOpen}
                sx={{
                  color: pageTitleColor,
                  fontSize: "14px",
                }}
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
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                  color: pageTitleColor,
                  fontSize: "14px",
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
                <MenuItem
                  component={NavLink}
                  to="/blogs"
                  onClick={handleMenuClose}
                >
                  Блог
                </MenuItem>
              </Menu>
            </Stack>
          )}

          {!isMobile ? (
            <Button
              variant="contained"
              onClick={handleCityClick}
              startIcon={<LocationOnIcon />}
              sx={{
                background: "transparent",
                color: "black",
                borderRadius: "15px",
                padding: "6px 16px",
                boxShadow: "none",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {selectedCity.icon} {selectedCity.name}
            </Button>
          ) : (
            <IconButton onClick={handleCityClick} sx={{ color: "black" }}>
              <LocationOnIcon />
            </IconButton>
          )}

          <Popover
            open={Boolean(cityAnchorEl)}
            anchorEl={cityAnchorEl}
            onClose={handleCityClose}
            disableScrollLock={true}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                width: isMobile ? '80%' : 'auto',
                borderRadius: '12px',
              },
            }}
          >
            <Stack spacing={1} sx={{ p: 2 }}>
              {cities.map((city) => (
                <MenuItem
                  key={city.name}
                  onClick={() => handleCitySelect(city)}
                  sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {city.icon} {city.name}
                </MenuItem>
              ))}
            </Stack>
          </Popover>

          {weather && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" sx={{ color: "black", fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                🌤️ {weather.temperature}°C
              </Typography>
            </Box>
          )}

          <IconButton
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            sx={{ color: "black" }}
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={userMenuEl}
            open={Boolean(userMenuEl)}
            onClose={handleUserMenuClose}
            disableScrollLock={true}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              style: {
                width: isMobile ? '80%' : 'auto',
                borderRadius: '12px',
              },
            }}
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
  );
}