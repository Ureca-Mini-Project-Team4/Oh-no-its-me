import axiosInstance from '../axiosInstance';

export interface ChangePasswordRequest {
  username: string;
  old_password: string;
  new_password: string;
}

export async function changePassword({
  username,
  old_password,
  new_password,
}: ChangePasswordRequest): Promise<void> {
  const response = await axiosInstance.patch('/user/password', {
    username,
    old_password,
    new_password,
  });
  return response.data;
}
