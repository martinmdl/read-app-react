import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import axios from 'axios'
import { loginService } from '../services/loginService'

vi.mock('axios') // Mock de axios

describe('loginService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería llamar a la API con el payload correcto y devolver el token', async () => {
    const payload = { username: 'testUser', password: 'securePassword' }
    const mockResponse = { data: { token: 'mockToken' } }

    ;(axios.post as Mock).mockResolvedValue(mockResponse)

    const result = await loginService(payload)

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/auth/login',
      payload,
    )
    expect(result).toEqual(mockResponse)
  })

  it('debería manejar errores y propagarlos', async () => {
    const payload = { username: 'testUser', password: 'wrongPassword' }
    const mockError = new Error('Request failed with status code 401')

    ;(axios.post as Mock).mockRejectedValue(mockError)

    await expect(loginService(payload)).rejects.toThrow(
      'Request failed with status code 401',
    )
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/auth/login',
      payload,
    )
  })
})
