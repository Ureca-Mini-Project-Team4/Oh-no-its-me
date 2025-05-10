import axiosInstance from '../axiosInstance';

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export async function changePassword(userId: string, body: ChangePasswordRequest): Promise<void> {
  const response = await axiosInstance.patch(`/user/${userId}`, body);
  return response.data;
}
