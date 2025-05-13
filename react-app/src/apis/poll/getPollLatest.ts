import axiosInstance from '../axiosInstance';

export interface getLastestPollIdsResponse {
  pollId: number;
}

export async function getLatestPollIds(): Promise<getLastestPollIdsResponse[]> {
  const response = await axiosInstance.get('/poll/latest');
  return response.data;
}
