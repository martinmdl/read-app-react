import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthorEdit } from './AuthorEdit'
import { authorService } from '../../../../services/authorService'

authorService.getAuthor = vi.fn().mockResolvedValue({
  id: 1,
  name: 'John',
  lastName: 'Doe',
  nativeLanguage: 'en_US',
});
authorService.updateAuthor = vi.fn()
authorService.createAuthor = vi.fn()

const mockNavigate = vi.fn()

describe('AuthorEdit Component', () => {
  vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
  }))

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component with initial values', async () => {
    (authorService.getAuthor as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 1,
      name: 'John',
      lastName: 'Doe',
      nativeLanguage: 'en_US',
    })

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<AuthorEdit />} />
        </Routes>
      </MemoryRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeDefined();
      expect(screen.getByDisplayValue('Doe')).toBeDefined();
      expect(screen.getByText('INGLES')).toBeDefined();
    })
  })

})
