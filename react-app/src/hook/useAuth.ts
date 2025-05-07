import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

// 현재 인증 상태를 반환하는 커스텀 훅
export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // login → setAuth 디스패치, logout → clearAuth 디스패치
  return {
    auth,
    login: (data: any) => dispatch(setAuth(data)),
    logout: () => dispatch(clearAuth()),
  };
};
