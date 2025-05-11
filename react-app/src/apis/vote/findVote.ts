import axiosInstance from '../axiosInstance';

export interface findVoteRequest {
  pollId: number;
}

export interface findVoteResponse {
  pollId: number;
  questionText: string;
  results: {
    username: string;
    voteCount: number;
  };
}

export async function findVote({ pollId }: findVoteRequest): Promise<findVoteResponse> {
  const response = await axiosInstance.get(`/vote/${pollId}`);

  return response.data;
}
