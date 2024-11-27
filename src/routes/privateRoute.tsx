import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Footer from '../components/common/footer/Footer'
import { Slide } from '@mui/material'

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={500}
      >
        <div>
          <Outlet />
          <Footer />
        </div>
      </Slide>
    </>
  )
}
