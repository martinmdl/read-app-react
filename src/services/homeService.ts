import axiosInstance from '../axiosConfig';

export interface cardValueDTO {
  usersAmount: number;
  readingCentersAmount: number;
  booksAmount: number;
  recommendationsAmount: number;
  inactiveUsersAmount: number;
  inactiveCentersAmount: number;
}

export const homeService = {
  getHomeCardsData: async () => {
    const response = await axiosInstance.get<cardValueDTO>('/cardsData');
    return response.data;
  },

  deleteInactiveUsers: async () => {
    await axiosInstance.delete<void>('/inactiveUsers');
  },

  deleteInactiveCenters: async () => {
    await axiosInstance.delete<void>('/inactiveCenters');
  },
};
