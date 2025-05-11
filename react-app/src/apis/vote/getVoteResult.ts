import axiosInstance from '../axiosInstance';

export interface getVoteResultRequest {
  userId: number;
}

export interface getVoteResultResponse {
  message: string;
}

export async function getVoteResult({
  userId,
}: getVoteResultRequest): Promise<getVoteResultResponse> {
  const response = await axiosInstance.post(`/vote/${userId}/complete`);

  return response.data;
}
