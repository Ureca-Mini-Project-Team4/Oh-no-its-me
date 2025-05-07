import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return {
    auth,
    login: (data: any) => dispatch(setAuth(data)),
    logout: () => dispatch(clearAuth()),
  };
};
