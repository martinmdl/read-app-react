import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '1rem',
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.5rem', margin: 0 }}>Page Not Found</p>
      <Link to="/home" style={{ fontSize: '1.2rem', color: '#1976d2', textDecoration: 'none' }}>
        Go to Home
      </Link>
    </Box>
  )
}
