import axiosInstance from '../axiosConfig';
import { AuthorDTO } from '../components/common/types/authorDto';
import { BookDto } from '../components/common/types/bookDto';

export const SearchService = {
  searchAuthor: async (searchValue: string) => {
    const response = await axiosInstance.post<AuthorDTO[]>('/filterAuthor', {
      searchValue,
    });
    return response.data;
  },

  searchBook: async (searchValue: string) => {
    const response = await axiosInstance.post<BookDto[]>('/filterBookAdmin', {
      searchValue,
    });
    return response.data;
  },
};
