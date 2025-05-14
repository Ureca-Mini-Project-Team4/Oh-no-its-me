import axiosInstance from '../axiosInstance';

export interface Poll {
  questionId: number;
  questionText: string;
  startTime: Date;
  endTime: Date;
}

export async function getPoll(): Promise<Poll[]> {
  const response = await axiosInstance.get('/poll');
  return response.data;
}
