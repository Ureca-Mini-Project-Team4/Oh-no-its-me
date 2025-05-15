import axiosInstance from '../axiosInstance';

export interface PostCommentRequest {
  user_id: number;
  comment_text: string;
}

export interface PostCommentResponse {
  status: string;
}

export async function postComment(
  params: PostCommentRequest,
): Promise<PostCommentResponse | undefined> {
  try {
    console.log('params : ', params);
    console.log('보내는 JSON : ', JSON.stringify(params));

    const response = await axiosInstance.post('/comment', params);
    return { status: response.data };
  } catch (err) {
    console.error('❌ postComment 에러:', err);
    return undefined;
  }
}
