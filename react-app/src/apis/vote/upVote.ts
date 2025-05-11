import axiosInstance from '../axiosInstance';

export interface upVoteRequest {
  pollId: number;
  candidateId: number;
}

export interface upVoteResponse {
  status: number;
}

export async function upVote({ pollId, candidateId }: upVoteRequest): Promise<upVoteResponse> {
  const response = await axiosInstance.post(`/vote/${pollId}`, { candidate_id: candidateId });

  return response.request;
}
