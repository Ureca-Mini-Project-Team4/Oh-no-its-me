import axiosInstance from '../axiosInstance';

export interface postVoteResultRequest {
  userId: number;
}

export interface postVoteResultResponse {
  message: string;
}

export async function postVoteResult({
  userId,
}: postVoteResultRequest): Promise<postVoteResultResponse> {
  const response = await axiosInstance.post(`/vote/${userId}/complete`);

  return response.data;
}
