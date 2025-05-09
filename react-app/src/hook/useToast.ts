import { useDispatch } from 'react-redux';
import { show, hide, ToastType } from '@/store/slices/toastSlice';

/**
 * 사용법
 * - const { showToast } = useToast();
 * - showToast('성공적으로 완료되었습니다!', 'success')
 */
export function useToast() {
  const dispatch = useDispatch();

  const showToast = (message: string, type: ToastType = 'information', duration: number = 4000) => {
    dispatch(show({ message, type }));

    setTimeout(() => {
      dispatch(hide());
    }, duration);
  };

  return { showToast };
}
