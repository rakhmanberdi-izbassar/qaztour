import * as React from "react";
import { useState, useEffect } from 'react';
import { styled, alpha, ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/system";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 23),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.1, 0.1, 0.1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEr, setAnchorEr] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isSearchOpen = Boolean(anchorEr);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchOpen = (event) => {
    setAnchorEr(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleSearchClose = () => {
    setAnchorEr(null);
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
        dark: '#0066CC',
        
      },
      success: {
        main: '#4caf50', // Жасыл түстің негізгі HEX коды
      },
      
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Мөлдірлік
          },
        },
      },
    },
  });
  

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const searchId = "primary-search-account-menu";
  const renderSearch = (
    <Menu
      anchorEl={anchorEr}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={searchId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isSearchOpen}
      onClose={handleSearchClose}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [bgColor, setBgColor] = useState('transparent');
  const [logoColor, setLogoColor] = useState('white'); 
  const [pageTitleColor, setPageTitleColor] = useState('white'); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { 
        setBgColor('#ffffff'); 
        setLogoColor('#161c2d'); 
        setPageTitleColor('#161c2d');
      } else {
        setBgColor('transparent'); 
        setLogoColor('#ffffff'); 
        setPageTitleColor('#ffffff');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  return (
    <ThemeProvider
    theme={theme}
    >
    <Box sx={{ flexGrow: 1, 
      bgcolor: 'primary.main',
      '&:hover': {
        bgcolor: 'primary.dark',
      }, }}>
      <AppBar position="fixed" 
      style={{
        backgroundColor: bgColor, 
        transition: 'background-color 0.3s ease', // Анимация қосу
        boxShadow: bgColor === 'transparent' ? 'none' : '0px 2px 5px rgba(0, 0, 0, 0.1)' // Түссіз болғанда көлеңке жоқ
      }}>
        <Container fixed>
          <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" }, color: logoColor }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack direction="row" spacing={3}>
            <Button
              component={NavLink}
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              sx={{ color: pageTitleColor }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              sx={{ color: pageTitleColor }}
            >
              Tours
            </Button>
            <Button
              component={NavLink}
              to="/listing"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              sx={{ color: pageTitleColor }}
            >
              About us
            </Button>
            <Button
              component={NavLink}
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              sx={{ color: pageTitleColor }}
            >
              Blog
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              sx={{ color: pageTitleColor }}
            >
              Contact us
            </Button>
          </Stack>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            aria-controls={searchId} // Мұны өзіңіз қосыңыз
            onClick={handleSearchOpen} // Мұны өзіңіз қосыңыз
          >
            <Badge color="error">
              <SearchIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId} // Мұны өзіңіз қосыңыз
            onClick={handleProfileMenuOpen} // Мұны өзіңіз қосыңыз
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId} // Мұны өзіңіз қосыңыз
            onClick={handleMobileMenuOpen} // Мұны өзіңіз қосыңыз
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderSearch}
    </Box>
    </ThemeProvider>
  );
}