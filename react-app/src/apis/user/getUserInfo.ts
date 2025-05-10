import axiosInstance from '../axiosInstance';

export interface UserInfoRequest {
  userId: number;
}

export interface UserInfoResponse {
  userId: number;
  username: string;
  randomNickname: string;
  selected: boolean;
  voted: boolean;
  token?: string | null;
}

export async function getUserInfo(userId: string): Promise<UserInfoResponse> {
  const response = await axiosInstance.post(`/user/${userId}`);
  return response.data;
}
