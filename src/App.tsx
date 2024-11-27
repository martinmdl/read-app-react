import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routing'
import { AuthProvider } from './context/authProvider'
import LinearWithValueLabel from './components/common/fall_back_element/LinearWithValueLabel'

function App() {
  return (
    <>
      <AuthProvider >
        <RouterProvider router={router}  fallbackElement={<LinearWithValueLabel />} />
      </AuthProvider>
    </>
  )
}

export default App
