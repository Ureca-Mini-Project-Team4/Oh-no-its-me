import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { hide } from '@/store/slices/toastSlice';

export default function Toast() {
  const toast = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  if (!toast.isShow) return null;

  const iconMap = {
    success: '/assets/icons/success.svg',
    warning: '/assets/icons/warning.svg',
    information: '/assets/icons/info.svg',
  };

  const bgMap = {
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    information: 'bg-[var(--color-info)]',
  };

  return (
    <div className="fixed top-20 sm:top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div
        className={`flex items-center gap-3 shadow-md sm:shadow-xl px-5 py-3 rounded-lg sm:rounded-2xl text-white ${bgMap[toast.type]}`}
        onClick={() => dispatch(hide())}
      >
        <img src={iconMap[toast.type]} alt="icon" className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-sm sm:text-base font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
