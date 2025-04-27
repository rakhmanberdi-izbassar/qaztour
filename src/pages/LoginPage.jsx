import React, { useState } from 'react'
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
  Divider,
} from '@mui/material'
import { Email, Lock, Person } from '@mui/icons-material'

const API_BASE_URL = 'http://localhost:8000/api'

const LoginPage = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerFullName, setRegisterFullName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        // Толық мекенжай
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        window.location.href = '/'
      } else {
        console.error('Login failed:', data)
        alert('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during login.')
    }
  }

  const handleRegisterSubmit = async (e, registerSurname) => {
    // Тегін параметр ретінде қабылдау
    e.preventDefault()

    if (registerPassword !== registerConfirmPassword) {
      alert('Passwords do not match.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerFullName,
          surname: registerSurname, // Тегін жіберу
          email: registerEmail,
          password: registerPassword,
          password_confirmation: registerConfirmPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Registration successful:', data)
        alert('Registration successful! Please log in.')
        setTabIndex(0)
      } else {
        console.error('Registration failed:', data)
        alert('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('An error occurred during registration.')
    }
  }

  const LoginForm = () => (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mt: 2 }}
      onSubmit={handleLoginSubmit}
    >
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: '#0c7c59' }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: '#0c7c59' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: '#29339b',
          '&:hover': { backgroundColor: '#0c7c59' },
        }}
        type="submit"
      >
        Login
      </Button>
    </Box>
  )

  const RegisterForm = () => {
    const [registerSurname, setRegisterSurname] = useState('') // Жаңа күй

    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mt: 2 }}
        onSubmit={(e) => handleRegisterSubmit(e, registerSurname)} // Тегін жіберу
      >
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          value={registerFullName}
          onChange={(e) => setRegisterFullName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: '#0c7c59' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Surname" // Жаңа өріс
          variant="outlined"
          margin="normal"
          value={registerSurname}
          onChange={(e) => setRegisterSurname(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: '#0c7c59' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: '#0c7c59' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#0c7c59' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={registerConfirmPassword}
          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: '#0c7c59' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#29339b',
            '&:hover': { backgroundColor: '#0c7c59' },
          }}
          type="submit"
        >
          Register
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
            border: '2px solid #29339b',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative elements */}
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
                sx={{ fontWeight: 600, color: '#241715', mb: 2 }}
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
                sx={{ fontWeight: 600, color: '#241715', mb: 2 }}
              >
                Create an Account
              </Typography>
              <RegisterForm />
            </Box>
          )}

          <Divider sx={{ my: 3, backgroundColor: '#7d7e75', opacity: 0.5 }} />
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: '#7d7e75' }}
          >
            By continuing, you agree to our Terms & Conditions.
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default LoginPage
