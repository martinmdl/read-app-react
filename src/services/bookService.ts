import axiosInstance from '../axiosConfig'
import { BookDto } from '../components/common/types/bookDto'

export const bookService = {
  getAllBooks: async () => {
    const response = await axiosInstance.get<BookDto[]>('/booksAdmin')
    return response.data
  },

  getBookById: async (id: number) => {
    const response = await axiosInstance.get<BookDto>(`/booksAdmin/${id}`)
    return response.data
  },

  createBook: async (book: BookDto, authorID: number) => {
    book.authorID = authorID
    if(book.languages.includes('')) {
      book.languages.pop()
      book.languages.push(book.nativeLanguage)
    }
    const response = await axiosInstance.post<BookDto>('/booksAdmin', book)
    return response.data
  },

  updateBook: async (idbook: number, book: BookDto, idAuthor: number) => {
    book.authorID = idAuthor
    await axiosInstance.put(`/booksAdmin/${idbook}`, book)
  },

  deleteBook: async (id: number) => {
    await axiosInstance.delete(`/booksAdmin/${id}`)
  },
}
