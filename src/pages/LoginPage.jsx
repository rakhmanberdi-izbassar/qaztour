import React, { useState } from "react";
import { 
  Container, 
  Paper, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  InputAdornment,
  Divider
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import Header from "../components/Header";

const LoginPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const LoginForm = () => (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "#0c7c59" }} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "#0c7c59" }} />
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ 
          mt: 2, 
          backgroundColor: "#29339b", 
          "&:hover": { backgroundColor: "#0c7c59" } 
        }}
        type="submit"
      >
        Login
      </Button>
    </Box>
  );

  const RegisterForm = () => (
    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Full Name"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person sx={{ color: "#0c7c59" }} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "#0c7c59" }} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "#0c7c59" }} />
            </InputAdornment>
          )
        }}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "#0c7c59" }} />
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ 
          mt: 2, 
          backgroundColor: "#29339b", 
          "&:hover": { backgroundColor: "#0c7c59" } 
        }}
        type="submit"
      >
        Register
      </Button>
    </Box>
  );

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Paper 
          elevation={5} 
          sx={{ 
            p: 4, 
            borderRadius: 3, 
            background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
            border: '2px solid #29339b',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Декоративные элементы */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              backgroundColor: '#0c7c59',
              borderRadius: '50%',
              opacity: 0.2,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 150,
              height: 150,
              backgroundColor: '#29339b',
              borderRadius: '50%',
              opacity: 0.2,
            }}
          />
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3, position: 'relative', zIndex: 1 }}
          >
            <Tab label="Login" sx={{ fontWeight: 'bold' }} />
            <Tab label="Register" sx={{ fontWeight: 'bold' }} />
          </Tabs>

          {tabIndex === 0 && (
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h5" 
                textAlign="center" 
                sx={{ fontWeight: 600, color: "#241715", mb: 2 }}
              >
                Welcome Back!
              </Typography>
              <LoginForm />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h5" 
                textAlign="center" 
                sx={{ fontWeight: 600, color: "#241715", mb: 2 }}
              >
                Create an Account
              </Typography>
              <RegisterForm />
            </Box>
          )}

          <Divider sx={{ my: 3, backgroundColor: "#7d7e75", opacity: 0.5 }} />
          <Typography variant="body2" textAlign="center" sx={{ color: "#7d7e75" }}>
            By continuing, you agree to our Terms & Conditions.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
