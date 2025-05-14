import axiosInstance from '../axiosInstance';

export interface getCandidateLatestResponse {
  pollId: number;
  userName: string;
  questionText: string;
  icon: string;
}

export async function getCandidateLatests(): Promise<getCandidateLatestResponse[]> {
  const response = await axiosInstance.get('/candidate/latest');
  return response.data;
}
