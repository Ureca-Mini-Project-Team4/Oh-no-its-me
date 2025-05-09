import { useDispatch } from 'react-redux';
import { show, hide } from '@/store/slices/toastSlice';
import { ToastType } from '@/store/slices/toastSlice';

export function useToast() {
  const dispatch = useDispatch();

  const showToast = (
    message: string,
    type: ToastType = 'information',
    duration: number = 4000, // 4초
  ) => {
    dispatch(show({ message, type }));
    setTimeout(() => {
      dispatch(hide());
    }, duration);
  };

  return { showToast };
}
