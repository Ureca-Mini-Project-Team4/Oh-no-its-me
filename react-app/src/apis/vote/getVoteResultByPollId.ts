import axiosInstance from '../axiosInstance';

export interface getVoteResultByPollIdRequest {
  pollId: number;
}

export interface getVoteResultByPollIdResponse {
  pollId: number;
  questionText: string;
  results: {
    username: string;
    voteCount: number;
  };
}

export async function getVoteResultByPollId({
  pollId,
}: getVoteResultByPollIdRequest): Promise<getVoteResultByPollIdResponse> {
  const response = await axiosInstance.get(`/vote/${pollId}`);

  return response.data;
}
