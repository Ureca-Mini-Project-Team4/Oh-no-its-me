import { ICONS } from '@/constants/iconPath';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
      <img src={ICONS.SPINNER} alt="로딩중" className="w-16 h-16 sm:w-24 sm:h-24" />
    </div>
  );
};

export default Loading;
