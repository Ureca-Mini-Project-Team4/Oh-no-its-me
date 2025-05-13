import axios from 'axios';
import { clearAuth } from '@/store/slices/authSlice';
import { store } from '@/store';

// 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 시 accessToken이 있으면 Authorization 헤더에 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// 401 응답 발생 시 refresh token으로 accessToken 갱신 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) throw error;

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh`,
          {},
          {
            headers: {
              'Refresh-Token': refreshToken,
              'Content-Type': 'application/json',
            },
          },
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 새 토큰으로 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 → 로그아웃 처리
        store.dispatch(clearAuth());
        localStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
