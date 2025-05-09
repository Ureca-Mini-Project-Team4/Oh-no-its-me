import axiosInstance from '../axiosInstance';

export interface CommentRequest {
  comment_id: number;
}

export interface CommentResponse {
  comment_id: number;
  user_id: number;
  random_nickname: string;
  comment_text: string;
}

export async function getComment(params: CommentRequest): Promise<CommentResponse> {
  const response = await axiosInstance.get(`/comment/${params.comment_id}`);

  return response.data;
}
