import axiosInstance from '../axiosInstance';

export interface completeVoteRequest {
  userId: number;
}

export interface completeVoteResponse {
  message: string;
}

export async function completeVote({ userId }: completeVoteRequest): Promise<completeVoteResponse> {
  const response = await axiosInstance.post(`/vote/${userId}/complete`);

  return response.data;
}
