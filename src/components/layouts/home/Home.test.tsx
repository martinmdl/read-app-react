import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { homeService } from '../../../services/homeService'
import { HomePage } from './Home'

describe('En home', () => {
  let mockData = {
    usersAmount: 4,
    readingCentersAmount: 3,
    booksAmount: 3,
    recommendationsAmount: 2,
    inactiveUsersAmount: 1,
    inactiveCentersAmount: 1,
  }

  beforeEach(async () => {
    vi.spyOn(homeService, 'getHomeCardsData').mockImplementation(async () => 
      {
        return Promise.resolve(mockData)
      }
    )

    vi.spyOn(homeService, 'deleteInactiveUsers').mockImplementation(
      async () => {
        mockData = {
          usersAmount: 3,
          readingCentersAmount: 3,
          booksAmount: 3,
          recommendationsAmount: 2,
          inactiveUsersAmount: 0,
          inactiveCentersAmount: 1,
        }

        return Promise.resolve()
      },
    )

    vi.spyOn(homeService, 'deleteInactiveCenters').mockImplementation(
      async () => {
        mockData = {
          usersAmount: 4,
          readingCentersAmount: 2,
          booksAmount: 3,
          recommendationsAmount: 2,
          inactiveUsersAmount: 1,
          inactiveCentersAmount: 0,
        }

        return Promise.resolve()
      },
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('al llamar a getHomeCardsData los valores de las cards son los de mockData', async () => {
    render(<HomePage />)

    await waitFor(() => {
      expect(homeService.getHomeCardsData).toHaveBeenCalledTimes(1)
    })

    expect(+screen.getByTestId('Total Users').textContent!).toBe(4)
    expect(+screen.getByTestId('Reading Centers').textContent!).toBe(3)
    expect(+screen.getByTestId("System's Books").textContent!).toBe(3)
    expect(+screen.getByTestId('Recommendation').textContent!).toBe(2)
  })

  it('al llamar a deleteInactiveUsers al valor de Usuarios totales se le resta los usuarios inactivos', async () => {
    render(<HomePage />)

    const buttonDelete = screen.getByTestId('delete-inactives-users')
    fireEvent.click(buttonDelete)

    await waitFor(() => {
      expect(homeService.deleteInactiveUsers).toHaveBeenCalledTimes(1)
      expect(homeService.getHomeCardsData).toHaveBeenCalledTimes(2)
    })

    expect(+screen.getByTestId('Total Users').textContent!).toBe(3)
  })

  it('al llamar a deleteInactiveCenters al valor de Centros de distribucion se le resta los centros inactivos', async () => {
    render(<HomePage />)

    const buttonDelete = screen.getByTestId('delete-inactives-centers')
    fireEvent.click(buttonDelete)

    await waitFor(() => {
      expect(homeService.deleteInactiveCenters).toHaveBeenCalledTimes(1)
      expect(homeService.getHomeCardsData).toHaveBeenCalledTimes(2)
    })

    expect(+screen.getByTestId('Reading Centers').textContent!).toBe(2)
  })
})
