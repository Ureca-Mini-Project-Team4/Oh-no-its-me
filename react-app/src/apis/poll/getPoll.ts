import axiosInstance from '../axiosInstance';

export interface pollResponse {
  questionId: number;
  questionText: string;
  startTime: Date;
  endTime: Date;
}

export async function getPoll(): Promise<pollResponse[]> {
  const response = await axiosInstance.get('/poll');
  return response.data;
}
