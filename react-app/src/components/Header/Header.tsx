import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '@/hook/useAuth';
import { useToast } from '@/hook/useToast';
import { RootState } from '@/store';
import { ICONS } from '@/constants/iconPath';
import Modal from '../Modal/Modal';

export default function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLogin = useSelector((state: RootState) => !!state.auth.user?.userId);
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleGoHome = () => {
    navigate(isLogin ? '/main' : '/');
  };

  const handleConfirmAction = () => {
    setIsModalOpen(false);

    if (isLogin) {
      logout();
      showToast('로그아웃 했습니다.', 'success');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full h-10 md:h-12 bg-[var(--color-primary-base)] z-50 shadow-md">
        <div className="flex items-center justify-between w-full h-full px-4">
          <img
            src={ICONS.HOME}
            alt="홈"
            onClick={handleGoHome}
            className="w-4 h-4 md:w-6 md:h-6 cursor-pointer hover:scale-110 transition-transform"
          />
          <p className="text-sm md:text-lg text-white font-gumi">Oh no, it's me!</p>
          <img
            src={ICONS.LOGOUT}
            alt={isLogin ? '로그아웃' : '로그인'}
            onClick={handleActionClick}
            className="w-4 h-4 md:w-6 md:h-6 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </header>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleConfirmAction}
        text1={isLogin ? '정말로 로그아웃 하시겠습니까?' : '로그인 하시겠습니까?'}
      />
    </>
  );
}
