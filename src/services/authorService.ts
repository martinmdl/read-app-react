import axiosInstance from '../axiosConfig'
import { AuthorDTO, editAuthorDTO } from '../components/common/types/authorDto'

export const authorService = {
  getAllAuthors: async () => {
    const response = await axiosInstance.get<AuthorDTO[]>('/author')
    return response.data
  },

  deleteAuthor: async (id: number) => {
    await axiosInstance.delete(`/authorDelete/${id}`)
  },

  getAuthor: async (id: number) => {
    const response = await axiosInstance.get<editAuthorDTO>(`/author/${id}`)
    return response.data
  },

  updateAuthor: async (id: number, data: editAuthorDTO) => {
    await axiosInstance.put(`/authorEdition/${id}`, data)
  },

  createAuthor: async (data: editAuthorDTO) => {
    await axiosInstance.post('/newAuthor', data)
  },
}
