import axiosInstance from '../axiosInstance';

export interface PostCandidateResponse {
  candidateId: number;
  userId: number;
  pollId: number;
  questionText: string;
  userName: string;
}

export async function postCandidate(): Promise<PostCandidateResponse[]> {
  const response = await axiosInstance.post('/candidate');
  return response.data;
}
