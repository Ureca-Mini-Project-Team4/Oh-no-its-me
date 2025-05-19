import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { UserInfoResponse } from './getUserInfo';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: UserInfoResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export async function login(params: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post('/user/login', params);
    const accessToken = response.headers['authorization']?.replace('Bearer ', '') ?? null;
    const refreshToken = response.headers['refresh-token'] ?? null;

    return {
      user: response.data.user as UserInfoResponse,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('로그인 요청이 실패했습니다.');
  }
}
