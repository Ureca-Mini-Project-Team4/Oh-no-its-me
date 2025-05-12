import axiosInstance from '../axiosInstance';

export interface pollResponse {
  questionId: number;
  questionText: string;
  startTime: string;
  endTime: string;
}

export async function getPoll(): Promise<pollResponse[]> {
  const response = await axiosInstance.get('/poll');
  return response.data;
}
