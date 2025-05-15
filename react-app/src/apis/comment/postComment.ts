import axiosInstance from '../axiosInstance';

export interface PostCommentRequest {
  user_id: number;
  random_nickname: string;
  comment_text: string;
}

export interface PostCommentResponse {
  status: string;
}

export async function postComment(params: PostCommentRequest): Promise<PostCommentResponse> {
  const response = await axiosInstance.post('/comment', params);

  return {
    status: response.data,
  };
}
