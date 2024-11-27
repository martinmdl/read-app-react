import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import axiosInstance from '../axiosConfig'
import { authorService } from '../services/authorService'
import { AuthorDTO, editAuthorDTO } from '../components/common/types/authorDto'

vi.mock('../axiosConfig')

describe('authorService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAllAuthors debería llamar a la API y devolver una lista de autores', async () => {
    const mockData: AuthorDTO[] = [
      { id: 1, fullName: 'Author One', nativeLanguage: 'English' },
      { id: 2, fullName: 'Author Two', nativeLanguage: 'Spanish' },
    ]

    ;(axiosInstance.get as Mock).mockResolvedValue({ data: mockData })

    const result = await authorService.getAllAuthors()
    expect(axiosInstance.get).toHaveBeenCalledWith('/author')
    expect(result).toEqual(mockData)
  })

  it('deleteAuthor debería llamar a la API con el ID correcto', async () => {
    const id = 1
    ;(axiosInstance.delete as Mock).mockResolvedValue({})

    await authorService.deleteAuthor(id)
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/authorDelete/${id}`)
  })

  it('getAuthor debería llamar a la API con el ID correcto y devolver los datos', async () => {
    const id = 1
    const mockData: editAuthorDTO = {
      id: 1,
      name: 'Author',
      lastName: 'One',
      nativeLanguage: 'English',
    }

    ;(axiosInstance.get as Mock).mockResolvedValue({ data: mockData })

    const result = await authorService.getAuthor(id)
    expect(axiosInstance.get).toHaveBeenCalledWith(`/author/${id}`)
    expect(result).toEqual(mockData)
  })

  it('updateAuthor debería llamar a la API con el ID y los datos correctos', async () => {
    const id = 1
    const data: editAuthorDTO = {
      id: 1,
      name: 'Updated',
      lastName: 'Author',
      nativeLanguage: 'English',
    }

    ;(axiosInstance.put as Mock).mockResolvedValue({})

    await authorService.updateAuthor(id, data)
    expect(axiosInstance.put).toHaveBeenCalledWith(`/authorEdition/${id}`, data)
  })

  it('createAuthor debería llamar a la API con los datos correctos', async () => {
    const data: editAuthorDTO = {
      id: null,
      name: 'New',
      lastName: 'Author',
      nativeLanguage: 'French',
    }

    ;(axiosInstance.post as Mock).mockResolvedValue({})

    await authorService.createAuthor(data)
    expect(axiosInstance.post).toHaveBeenCalledWith('/newAuthor', data)
  })
})
