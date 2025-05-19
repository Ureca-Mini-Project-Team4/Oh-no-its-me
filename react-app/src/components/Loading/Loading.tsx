import { ICONS } from '@/constants/iconPath';

const Loading = () => {
  return (
    <div className="w-full h-full z-[999] flex flex-col items-center justify-center bg-white">
      <img src={ICONS.SPINNER} alt="로딩중" className="w-12 h-12 sm:w-16 sm:h-16" />
    </div>
  );
};

export default Loading;
