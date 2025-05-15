import axiosInstance from '../axiosInstance';

export interface getLastestPollIdsResponse {
  pollId: number;
}

export async function getLatestPollIds(): Promise<number[]> {
  const response = await axiosInstance.get('/poll/latest');
  return response.data;
}
