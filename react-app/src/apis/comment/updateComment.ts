import axiosInstance from '../axiosInstance';

export interface UpdateCommentRequest {
  comment_id: number;
  user_id: number;
  comment_text: string;
}

export interface UpdateCommentResponse {
  status: string;
}

export async function updateComment(params: UpdateCommentRequest): Promise<UpdateCommentResponse> {
  const { comment_id, user_id, comment_text } = params;

  const response = await axiosInstance.patch(`/comment/${comment_id}`, {
    user_id,
    comment_text,
  });

  return response.data;
}
