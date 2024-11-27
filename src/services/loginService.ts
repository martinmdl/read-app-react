import axios from 'axios'

interface LoginResponse {
  token: string
}

interface Payload {
  username: string
  password: string
}

export const loginService = async (payload: Payload) => {
  return await axios.post<LoginResponse>('http://localhost:8080/auth/login', payload)
}
