import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import axiosInstance from '../axiosConfig'
import { bookService } from '../services/bookService'
import { BookDto } from '../components/common/types/bookDto'

vi.mock('../axiosConfig')

describe('bookService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockBook: BookDto = {
    id: 1,
    authorID: 1,
    bookTitle: 'Mock Book',
    authorName: 'Mock Author',
    pagesCount: 300,
    wordsCount: 90000,
    numberEditions: 2,
    nativeLanguage: 'English',
    languages: ['English', 'Spanish'],
    weekSales: 500,
    complexLecture: false,
    bestSeller: true,
  }

  it('getAllBooks debería llamar a la API y devolver una lista de libros', async () => {
    const mockData: BookDto[] = [mockBook]

    ;(axiosInstance.get as Mock).mockResolvedValue({ data: mockData })

    const result = await bookService.getAllBooks()
    expect(axiosInstance.get).toHaveBeenCalledWith('/booksAdmin')
    expect(result).toEqual(mockData)
  })

  it('getBookById debería llamar a la API con el ID correcto y devolver los datos del libro', async () => {
    const id = 1

    ;(axiosInstance.get as Mock).mockResolvedValue({ data: mockBook })

    const result = await bookService.getBookById(id)
    expect(axiosInstance.get).toHaveBeenCalledWith(`/booksAdmin/${id}`)
    expect(result).toEqual(mockBook)
  })

  it('createBook debería llamar a la API con los datos del libro y ajustar los idiomas', async () => {
    const newBook: BookDto = {
      ...mockBook,
      id: null,
      authorID: null,
      languages: [''],
    }

    const authorID = 2
    const expectedBook = {
      ...newBook,
      authorID,
      languages: [newBook.nativeLanguage],
    }

    ;(axiosInstance.post as Mock).mockResolvedValue({ data: expectedBook })

    const result = await bookService.createBook(newBook, authorID)
    expect(axiosInstance.post).toHaveBeenCalledWith('/booksAdmin', expectedBook)
    expect(result).toEqual(expectedBook)
  })

  it('updateBook debería llamar a la API con el ID del libro, los datos y el ID del autor', async () => {
    const idbook = 1
    const updatedBook = { ...mockBook, bookTitle: 'Updated Title' }
    const idAuthor = 3

    await bookService.updateBook(idbook, updatedBook, idAuthor)
    expect(axiosInstance.put).toHaveBeenCalledWith(`/booksAdmin/${idbook}`, {
      ...updatedBook,
      authorID: idAuthor,
    })
  })

  it('deleteBook debería llamar a la API con el ID correcto', async () => {
    const id = 1

    ;(axiosInstance.delete as Mock).mockResolvedValue({})

    await bookService.deleteBook(id)
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/booksAdmin/${id}`)
  })
})
