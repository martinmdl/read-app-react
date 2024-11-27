import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Use only with an AuthProvider')
  return context
}
