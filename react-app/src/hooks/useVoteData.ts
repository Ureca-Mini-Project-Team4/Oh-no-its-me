import { useNavigate } from "react-router-dom";
import { useToast } from "./useToast";
import { useEffect, useState } from "react";
import { getCandidateLatestResponse, getCandidateLatests } from "@/apis/candidate/getCandidateLatest";
import { AxiosError } from "axios";

const useVoteData = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pollData, setPollData] = useState<{ [pollId: number]: getCandidateLatestResponse[] }>({});
  const [pollIds, setPollIds] = useState<number[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getCandidateLatests();
          const groupedData: { [pollId: number]: getCandidateLatestResponse[] } = {};
  
          data.forEach((item) => {
            if (!groupedData[item.pollId]) {
              groupedData[item.pollId] = [];
            }
            groupedData[item.pollId].push(item);
          });
  
          const ids = Object.keys(groupedData)
            .map(Number)
            .sort((a, b) => a - b);
          setPollData(groupedData);
          setPollIds(ids);
        } catch (error) {
          navigate('/main');
          if (error instanceof AxiosError) {
            const message =
              typeof error.response?.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response?.data);
            showToast(message, 'warning');
          } else {
            showToast(String(error), 'warning');
          }
        }
      }
  
      fetchData();
    }, []);
  return { pollData , pollIds};
};

export default useVoteData;