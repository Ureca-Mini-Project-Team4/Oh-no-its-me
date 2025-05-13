import { login } from '@/apis/user/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setAuth, clearAuth } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserInfoResponse } from '@/apis/user/getUserInfo';
import { useToast } from './useToast';
import { AxiosError } from 'axios';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogin = async (username: string, password: string) => {
    try {
      const { user, accessToken, refreshToken } = await login({ username, password });

      if (user && accessToken && refreshToken) {
        dispatch(setAuth({ user: user as UserInfoResponse }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', String(user.userId));
        navigate('/main');
      } else {
        throw new Error('로그인 정보가 올바르지 않습니다.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          showToast(error.message, 'warning');
        } else {
          const message =
            typeof error.response?.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response?.data);
          showToast(message, 'warning');
        }
      } else {
        showToast(String(error), 'warning');
      }
      throw error;
    }
  };

  const logout = () => {
    dispatch(clearAuth());
    localStorage.clear();
  };

  const isLoggedIn = Boolean(user);

  return { user, isLoggedIn, login: handleLogin, logout };
}
