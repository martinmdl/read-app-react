import { describe, it, vi, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Authors } from './Authors'
import { authorService } from '../../../services/authorService'

// Configuración de tema y helper para renderizado
const theme = createTheme()

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>,
  )
}

// Mock de navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter,
    useNavigate: () => mockNavigate,
  }
})

// Mock del servicio
vi.mock('../../../services/authorService', () => ({
  authorService: {
    getAllAuthors: vi.fn(),
  },
}))

describe('Authors Component', () => {
  const mockAuthors = [
    { id: 1, fullName: 'Author 1', nativeLanguage: 'English' },
    { id: 2, fullName: 'Author 2', nativeLanguage: 'Spanish' },
  ]

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('debe renderizar la lista de autores cuando la carga es exitosa', async () => {
    // Arrange
    vi.spyOn(authorService, 'getAllAuthors').mockResolvedValueOnce(mockAuthors)
    renderWithProviders(<Authors />)

    // Act
    const authors = await screen.findAllByText(/Author/i)

    // Assert
    expect(authors).toHaveLength(mockAuthors.length)
  })

  it('debe mostrar un mensaje de error cuando la carga falla', async () => {
    // Arrange
    vi.spyOn(authorService, 'getAllAuthors').mockRejectedValueOnce('Error')
    renderWithProviders(<Authors />)

    // Act
    const error = await screen.findByText(/Error/i)

    // Assert
    expect(error).toBeDefined()
  })
})
