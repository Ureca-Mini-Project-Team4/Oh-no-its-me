import axios from 'axios';
import { store } from '@/store';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

// axios 인스턴스 생성 (baseURL, 헤더 등)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 시 accessToken이 있으면 Authorization 헤더에 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
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
        const refreshToken = store.getState().auth.refreshToken;
        const res = await axios.post(
          '/api/token/refresh',
          {},
          {
            headers: { 'Refresh-Token': refreshToken },
          },
        );
        const { accessToken } = res.data;
        store.dispatch(setAuth({ ...store.getState().auth, accessToken }));
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearAuth());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
