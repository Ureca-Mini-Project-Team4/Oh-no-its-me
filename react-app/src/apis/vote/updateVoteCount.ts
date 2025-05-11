import axiosInstance from '../axiosInstance';

export interface updateVoteCountRequest {
  pollId: number;
  candidateId: number;
}

export interface updateVoteCountResponse {
  status: number;
}

export async function updateVoteCount({
  pollId,
  candidateId,
}: updateVoteCountRequest): Promise<updateVoteCountResponse> {
  const response = await axiosInstance.post(`/vote/${pollId}`, { candidate_id: candidateId });

  return response.request;
}
