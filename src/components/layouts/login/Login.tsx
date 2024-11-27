import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import ColorModeSelect from '../../common/theme/ColorModeSelect'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { loginService } from '../../../services/loginService'
import {
  Alert,
  Button,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const LoginCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}))

const AlertMessage = ({ message }: { message: string }) => (
  <Alert severity="error">{message}</Alert>
)

type Payload = {
  username: string
  password: string
}

export default function SignUp() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Payload>()

  const onSubmit = async (data: Payload) => {
    try {
      const response = await loginService(data)
      login(response.data.token)
      navigate('/home')
    } catch (error) {
      setError('root', {
        type: 'custom',
        message: `Invalid username or password. ${error}`,
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer>
        <LoginCard as="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" textAlign="center">
            ReadApp Admin Center
          </Typography>

          <TextField
            label="Username"
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            variant="outlined"
            autoComplete="username"
            aria-describedby="username-error"
          />
          {errors.username && (
            <AlertMessage message={errors.username.message || ''} />
          )}

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            variant="outlined"
            autoComplete="current-password"
            aria-describedby="password-error"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {errors.password && (
            <AlertMessage message={errors.password.message || ''} />
          )}

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          {errors.root && (
            <Alert severity="warning">{errors.root.message}</Alert>
          )}
        </LoginCard>
      </SignUpContainer>
    </>
  )
}
