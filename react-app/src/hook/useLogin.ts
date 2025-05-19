import { login as loginApi } from '@/apis/user/login';
import { useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserInfoResponse } from '@/apis/user/getUserInfo';
import { useToast } from './useToast';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 401) return '아이디 또는 비밀번호가 올바르지 않습니다.';
      if (typeof data === 'string') return data;
      if (typeof data?.message === 'string') return data.message;
      if (typeof data?.error === 'string') return data.error;

      return error.message;
    }
    return String(error);
  };

  const { mutateAsync: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ user, accessToken, refreshToken }) => {
      if (user && accessToken && refreshToken) {
        dispatch(setAuth({ user: user as UserInfoResponse }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', String(user.userId));
        localStorage.setItem('voted', String(user.voted));
        navigate('/main');
      } else {
        showToast('로그인 정보가 올바르지 않습니다.', 'warning');
      }
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      showToast(message, 'warning');
    },
  });

  const logout = () => {
    dispatch(clearAuth());
    localStorage.clear();
  };

  return { login, logout };
}
