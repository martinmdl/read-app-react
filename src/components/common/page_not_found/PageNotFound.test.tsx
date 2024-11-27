import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PageNotFound } from './PageNotFound'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Configuración del tema (opcional)
const theme = createTheme()

// Helper para renderizar con Router y ThemeProvider
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>
  )
}

describe('PageNotFound Component', () => {
  it('debe renderizar el título 404', () => {
    // Arrange
    renderWithProviders(<PageNotFound />)

    // Act
    const heading = screen.getByText('404')

    // Assert
    expect(heading).not.toBeNull() // Verifica que se encontró el elemento
    expect(heading.tagName).toBe('H1') // Verifica la etiqueta del elemento
    expect(heading.style.fontSize).toBe('6rem') // Verifica el estilo directamente
  })

  it('debe renderizar el mensaje "Page Not Found"', () => {
    // Arrange
    renderWithProviders(<PageNotFound />)

    // Act
    const message = screen.getByText('Page Not Found')

    // Assert
    expect(message).not.toBeNull()
    expect(message.tagName).toBe('P') // Verifica la etiqueta del mensaje
    expect(message.style.fontSize).toBe('1.5rem')
  })

  it('debe renderizar un enlace que redirige a "/home"', () => {
    // Arrange
    renderWithProviders(<PageNotFound />)

    // Act
    const link = screen.getByRole('link', { name: /go to home/i })

    // Assert
    expect(link).not.toBeNull()
    expect(link.getAttribute('href')).toBe('/home') // Verifica la URL del enlace
    expect(link.style.fontSize).toBe('1.2rem') // Verifica el estilo del enlace
    expect(link.style.color).toBe('rgb(25, 118, 210)') // Material UI convierte colores a rgb
    expect(link.style.textDecoration).toBe('none') // Verifica que no tiene subrayado
  })
})
