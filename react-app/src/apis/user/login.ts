import axiosInstance from '../axiosInstance';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    userId: number;
    username: string;
    randomNickname: string;
    accessToken: string;
    refreshToken: string;
  };
}

export async function login(params: LoginRequest): Promise<LoginResponse> {
  const response = await axiosInstance.post('/user/login', params);
  return response.data;
}
