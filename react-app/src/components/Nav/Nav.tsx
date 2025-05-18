import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { useAuth } from '@/hook/useAuth';
import { useToast } from '@/hook/useToast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useSelector((state: RootState) => !!state.auth.user?.userId);
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleMoveToHome = () => {
    if (isLogin) navigate('/main');
    else navigate('/');
  };

  const handleConfirm = () => {
    setIsOpen(false);

    if (isLogin) {
      logout();
      showToast('로그아웃 했습니다.', 'success');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-10 md:h-12 bg-[var(--color-primary-base)] flex items-center justify-between px-4 shadow-md z-50">
        <img
          src="/assets/icons/home.png"
          alt="홈"
          onClick={handleMoveToHome}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform"
        />
        <p className="text-sm md:text-lg text-white">Oh no, it's me!</p>
        <img
          src="/assets/icons/logout.png"
          alt={isLogin ? '로그아웃' : '로그인'}
          onClick={handleClick}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={handleConfirm}
        text1={isLogin ? '정말로 로그아웃 하시겠습니까?' : '로그인 하시겠습니까?'}
      />
    </>
  );
};

export default Nav;
