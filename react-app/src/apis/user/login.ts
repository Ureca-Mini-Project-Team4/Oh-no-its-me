import axiosInstance from '../axiosInstance';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    userId: number;
    voted: boolean;
  };
  accessToken: string | null;
  refreshToken: string | null;
}

export async function login(params: LoginRequest): Promise<LoginResponse> {
  const response = await axiosInstance.post('/user/login', params);
  const accessToken = response.headers['authorization']?.replace('Bearer ', '');
  const refreshToken = response.headers['refresh-token'];

  return {
    user: response.data.user,
    accessToken,
    refreshToken,
  };
}
