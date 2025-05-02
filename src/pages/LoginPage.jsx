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
  styled,
} from '@mui/material'

import { Email, Lock, Person } from '@mui/icons-material'

import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

// Арнайы стильдендірілген компоненттер

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),

  borderRadius: theme.spacing(2),

  boxShadow: theme.shadows[5],

  backgroundColor: theme.palette.background.paper,

  border: `1px solid ${theme.palette.divider}`,

  position: 'relative',

  overflow: 'hidden',
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),

  backgroundColor: '#29339b',

  color: theme.palette.common.white,

  '&:hover': {
    backgroundColor: '#0c7c59',
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}))

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
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: loginEmail,

        password: loginPassword,
      })

      localStorage.setItem('authToken', response.data.token)
      window.location.href = '/'
    } catch (error) {
      console.error(
        'Login error:',

        error.response ? error.response.data : error.message
      )

      alert('Login failed. Please check your credentials.')
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()

    try {
      const csrfResponse = await axios.get(
        `${API_BASE_URL}/sanctum/csrf-cookie`,

        { withCredentials: true }
      )

      const xsrfToken = csrfResponse.headers['x-xsrf-token']

      const response = await axios.post(
        `${API_BASE_URL}/register`,

        {
          name: registerFullName,

          email: registerEmail,

          password: registerPassword,

          password_confirmation: registerConfirmPassword,
        },

        {
          headers: {
            'X-XSRF-TOKEN': xsrfToken,
          },

          withCredentials: true,
        }
      )

      console.log('Success:', response.data)

      alert('Registration successful!')

      setTabIndex(0)
    } catch (error) {
      console.error('Registration error:', error)

      alert('Registration failed. Please try again.')
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
           {' '}
      <StyledTextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                            <Email sx={{ color: '#0c7c59' }} />           {' '}
            </InputAdornment>
          ),
        }}
      />
           {' '}
      <StyledTextField
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
                            <Lock sx={{ color: '#0c7c59' }} />           {' '}
            </InputAdornment>
          ),
        }}
      />
           {' '}
      <StyledButton variant="contained" fullWidth type="submit">
                Login      {' '}
      </StyledButton>
         {' '}
    </Box>
  )

  const RegisterForm = () => (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mt: 2 }}
      onSubmit={handleRegisterSubmit}
    >
           {' '}
      <StyledTextField
        fullWidth
        label="Full Name"
        variant="outlined"
        margin="normal"
        value={registerFullName}
        onChange={(e) => setRegisterFullName(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                            <Person sx={{ color: '#0c7c59' }} />           {' '}
            </InputAdornment>
          ),
        }}
      />
           {' '}
      <StyledTextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                            <Email sx={{ color: '#0c7c59' }} />           {' '}
            </InputAdornment>
          ),
        }}
      />
           {' '}
      <StyledTextField
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
                            <Lock sx={{ color: '#0c7c59' }} />           {' '}
            </InputAdornment>
          ),
        }}
      />
           {' '}
      <StyledTextField
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
                            <Lock sx={{ color: '#0c7c59' }} />           {' '}
            </InputAdornment>
          ),
        }}
      />
           {' '}
      <StyledButton variant="contained" fullWidth type="submit">
                Register      {' '}
      </StyledButton>
         {' '}
    </Box>
  )

  return (
    <>
           {' '}
      <Container maxWidth="sm" sx={{ py: 5 }}>
               {' '}
        <StyledPaper>
                    {/* Decorative elements */}         {' '}
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

              zIndex: 0,
            }}
          />
                   {' '}
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

              zIndex: 0,
            }}
          />
                   {' '}
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 3, position: 'relative', zIndex: 1 }}
          >
                        <StyledTab label="Login" />
                        <StyledTab label="Register" />         {' '}
          </Tabs>
                   {' '}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
                       {' '}
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontWeight: 600, color: '#241715', mb: 2 }}
            >
                           {' '}
              {tabIndex === 0 ? 'Welcome Back!' : 'Create an Account'}         
               {' '}
            </Typography>
                        {tabIndex === 0 && <LoginForm />}           {' '}
            {tabIndex === 1 && <RegisterForm />}         {' '}
          </Box>
                   {' '}
          <Divider
            sx={{
              my: 3,

              backgroundColor: '#7d7e75',

              opacity: 0.5,

              zIndex: 1,

              position: 'relative',
            }}
          />
                   {' '}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: '#7d7e75', position: 'relative', zIndex: 1 }}
          >
                        By continuing, you agree to our Terms & Conditions.    
                 {' '}
          </Typography>
                 {' '}
        </StyledPaper>
             {' '}
      </Container>
         {' '}
    </>
  )
}

export default LoginPage
