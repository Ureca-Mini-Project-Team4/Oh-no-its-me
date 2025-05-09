import axiosInstance from '../axiosInstance';

export interface DeleteCommentRequest {
  comment_id: number;
  user_id: number;
}

export interface DeleteCommentResponse {
  status: string;
}

export async function deleteComment(params: DeleteCommentRequest): Promise<DeleteCommentResponse> {
  const { comment_id, user_id } = params;

  const response = await axiosInstance.delete(`/comment/${comment_id}`, {
    data: {
      user_id,
    },
  });

  return response.data;
}