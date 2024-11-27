import { ReactNode, useState } from 'react'
import { AuthContext } from './authContext'

//Falta persistir el estado de autenticación.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (token: string) => {
    sessionStorage.setItem('token', token)
    setIsAuthenticated(true)}
  const logout = () => {
    sessionStorage.removeItem('token')
    setIsAuthenticated(false)}

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
