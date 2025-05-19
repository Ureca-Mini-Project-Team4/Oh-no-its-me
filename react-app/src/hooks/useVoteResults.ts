import { useQuery } from '@tanstack/react-query';
import { getLatestPollIds } from '@/apis/poll/getPollLatest';
import { getVoteResultByPollId } from '@/apis/vote/getVoteResultByPollId';

export type VoteResult = {
  pollId: number;
  questionText: string;
  username: string;
  voteCount: number;
};

export const useVoteResults = () => {
  return useQuery<VoteResult[], Error>({
    queryKey: ['voteResults'],
    queryFn: async () => {
      const latestPollIds = await getLatestPollIds();
      const resultData = await Promise.all(
        latestPollIds.map(async (pollId) => {
          const result = await getVoteResultByPollId({ pollId });
          const topResult = result.results[0];
          return {
            pollId,
            questionText: result.questionText,
            username: topResult?.username ?? '',
            voteCount: topResult?.voteCount ?? 0,
          };
        }),
      );
      return resultData;
    },
    staleTime: 1000 * 60 * 1, // 1분 동안 fresh
  });
};
