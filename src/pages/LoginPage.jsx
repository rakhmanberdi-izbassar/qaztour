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
  useTheme,
} from '@mui/material'
import { Email, Lock, Person } from '@mui/icons-material'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden',
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}))

// LoginForm компонентін сыртқа шығару
const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  theme,
}) => (
  <Box
    component="form"
    noValidate
    autoComplete="off"
    sx={{ mt: 2 }}
    onSubmit={onSubmit}
  >
    <StyledTextField
      fullWidth
      label="Емайл"
      variant="outlined"
      margin="normal"
      value={email}
      onChange={onEmailChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        ),
      }}
    />
    <StyledTextField
      fullWidth
      label="Құпия сөз"
      variant="outlined"
      margin="normal"
      type="password"
      value={password}
      onChange={onPasswordChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        ),
      }}
    />
    <StyledButton variant="contained" fullWidth type="submit">
      Кіру
    </StyledButton>
  </Box>
)

// RegisterForm компонентін сыртқа шығару
const RegisterForm = ({
  fullName,
  email,
  password,
  confirmPassword,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  theme,
}) => (
  <Box
    component="form"
    noValidate
    autoComplete="off"
    sx={{ mt: 2 }}
    onSubmit={onSubmit}
  >
    <StyledTextField
      fullWidth
      label="Толық аты-жөні"
      variant="outlined"
      margin="normal"
      value={fullName}
      onChange={onFullNameChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Person sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        ),
      }}
    />
    <StyledTextField
      fullWidth
      label="Емайл"
      variant="outlined"
      margin="normal"
      value={email}
      onChange={onEmailChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        ),
      }}
    />
    <StyledTextField
      fullWidth
      label="Құпия сөз"
      variant="outlined"
      margin="normal"
      type="password"
      value={password}
      onChange={onPasswordChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        ),
      }}
    />
    <StyledTextField
      fullWidth
      label="Құпия сөзді растау"
      variant="outlined"
      margin="normal"
      type="password"
      value={confirmPassword}
      onChange={onConfirmPasswordChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock sx={{ color: theme.palette.primary.main }} />
          </InputAdornment>
        ),
      }}
    />
    <StyledButton variant="contained" fullWidth type="submit">
      Тіркелу
    </StyledButton>
  </Box>
)

const LoginPage = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerFullName, setRegisterFullName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const theme = useTheme()

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

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <StyledPaper>
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '50%',
              opacity: 0.2,
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 150,
              height: 150,
              backgroundColor: theme.palette.primary.main,
              borderRadius: '50%',
              opacity: 0.2,
              zIndex: 0,
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
            <StyledTab label="Кіру" />
            <StyledTab label="Тіркелу" />
          </Tabs>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}
            >
              {tabIndex === 0 ? 'Қош келдіңіз!' : 'Аккаунт жасаңыз!'}
            </Typography>
            {tabIndex === 0 && (
              <LoginForm
                email={loginEmail}
                password={loginPassword}
                onEmailChange={(e) => setLoginEmail(e.target.value)}
                onPasswordChange={(e) => setLoginPassword(e.target.value)}
                onSubmit={handleLoginSubmit}
                theme={theme}
              />
            )}
            {tabIndex === 1 && (
              <RegisterForm
                fullName={registerFullName}
                email={registerEmail}
                password={registerPassword}
                confirmPassword={registerConfirmPassword}
                onFullNameChange={(e) => setRegisterFullName(e.target.value)}
                onEmailChange={(e) => setRegisterEmail(e.target.value)}
                onPasswordChange={(e) => setRegisterPassword(e.target.value)}
                onConfirmPasswordChange={(e) =>
                  setRegisterConfirmPassword(e.target.value)
                }
                onSubmit={handleRegisterSubmit}
                theme={theme}
              />
            )}
          </Box>
          <Divider
            sx={{
              my: 3,
              backgroundColor: theme.palette.divider,
              opacity: 0.5,
              zIndex: 1,
              position: 'relative',
            }}
          />
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              color: theme.palette.text.secondary,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Жалғастыру арқылы сіз біздің Шарттарымызбен келісесіз.
          </Typography>
        </StyledPaper>
      </Container>
    </>
  )
}

export default LoginPage
