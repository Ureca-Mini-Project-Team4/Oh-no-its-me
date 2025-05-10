import axiosInstance from '../axiosInstance';

export interface CommentsResponse {
  comment_id: number;
  user_id: number;
  random_nickname: string;
  comment_text: string;
}

export async function getComments(): Promise<CommentsResponse[]> {
  const response = await axiosInstance.get('/comment');

  if (response.status === 204) {
    return [];
  }

  return response.data;
}
