import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import axiosInstance from '../axiosConfig'
import { SearchService } from '../services/searchService'
import { AuthorDTO } from '../components/common/types/authorDto'
import { BookDto } from '../components/common/types/bookDto'

vi.mock('../axiosConfig') // Mock de axiosInstance

describe('SearchService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('searchAuthor debería llamar a la API con el valor de búsqueda correcto y devolver una lista de autores', async () => {
    const searchValue = 'John'
    const mockAuthors: AuthorDTO[] = [
      { id: 1, fullName: 'John Doe', nativeLanguage: 'English' },
      { id: 2, fullName: 'Johnny Appleseed', nativeLanguage: 'French' },
    ]

    ;(axiosInstance.post as Mock).mockResolvedValue({ data: mockAuthors })

    const result = await SearchService.searchAuthor(searchValue)
    expect(axiosInstance.post).toHaveBeenCalledWith('/filterAuthor', {
      searchValue,
    })
    expect(result).toEqual(mockAuthors)
  })

  it('searchBook debería llamar a la API con el valor de búsqueda correcto y devolver una lista de libros', async () => {
    const searchValue = 'Programming'
    const mockBooks: BookDto[] = [
      {
        id: 1,
        authorID: 1,
        bookTitle: 'Learn Programming',
        authorName: 'John Doe',
        pagesCount: 300,
        wordsCount: 90000,
        numberEditions: 2,
        nativeLanguage: 'English',
        languages: ['English', 'Spanish'],
        weekSales: 500,
        complexLecture: false,
        bestSeller: true,
      },
      {
        id: 2,
        authorID: 2,
        bookTitle: 'Advanced Programming',
        authorName: 'Jane Smith',
        pagesCount: 400,
        wordsCount: 120000,
        numberEditions: 3,
        nativeLanguage: 'English',
        languages: ['English'],
        weekSales: 600,
        complexLecture: true,
        bestSeller: false,
      },
    ]

    ;(axiosInstance.post as Mock).mockResolvedValue({ data: mockBooks })

    const result = await SearchService.searchBook(searchValue)
    expect(axiosInstance.post).toHaveBeenCalledWith('/filterBookAdmin', {
      searchValue,
    })
    expect(result).toEqual(mockBooks)
  })
})
