import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import axiosInstance from '../axiosConfig'
import { homeService } from '../services/homeService'
import { cardValueDTO } from '../services/homeService'

vi.mock('../axiosConfig')

describe('homeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getHomeCardsData debería llamar a la API y devolver los datos de las tarjetas', async () => {
    const mockData: cardValueDTO = {
      usersAmount: 100,
      readingCentersAmount: 50,
      booksAmount: 200,
      recommendationsAmount: 150,
      inactiveUsersAmount: 10,
      inactiveCentersAmount: 5,
    }

    ;(axiosInstance.get as Mock).mockResolvedValue({ data: mockData })

    const result = await homeService.getHomeCardsData()
    expect(axiosInstance.get).toHaveBeenCalledWith('/cardsData')
    expect(result).toEqual(mockData)
  })

  it('deleteInactiveUsers debería llamar a la API para eliminar usuarios inactivos', async () => {
    ;(axiosInstance.delete as Mock).mockResolvedValue({})

    await homeService.deleteInactiveUsers()
    expect(axiosInstance.delete).toHaveBeenCalledWith('/inactiveUsers')
  })

  it('deleteInactiveCenters debería llamar a la API para eliminar centros inactivos', async () => {
    ;(axiosInstance.delete as Mock).mockResolvedValue({})

    await homeService.deleteInactiveCenters()
    expect(axiosInstance.delete).toHaveBeenCalledWith('/inactiveCenters')
  })
})
