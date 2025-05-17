import { useCallback, useState } from 'react';
import { useAuth } from '@/hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { IMAGES } from '@/constants/imagePath';

const Login = () => {
  const navigation = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const handleLogin = useCallback(() => {
    try {
      login({ username, password });
    } catch (e) {
      setPassword('');
    }
  }, [login, username, password]);

  const handlePasswordChange = useCallback(() => {
    navigation('/change-password');
  }, [navigation]);

  return (
    <div
      className={`flex justify-center items-center w-screen h-screen overflow-hidden ${
        isDesktop ? 'text-[1.2vw]' : 'text-[2.5vw]'
      }`}
    >
      <div className="flex justify-center items-center w-[70%] max-w-[900px] h-[80%] rounded-2xl overflow-hidden">
        {isDesktop && (
          <img
            src={IMAGES.ROCKET}
            alt="로켓"
            className="w-[40%] aspect-square flex justify-center items-center object-contain"
          />
        )}
        <div
          className={`flex flex-col justify-center ${isDesktop ? 'w-1/2 px-8' : 'w-full px-6 gap-[2vw]'}`}
        >
          <h2
            className={`font-gumi font-bold text-center mb-8 ${
              isDesktop ? 'text-[3vw]' : 'text-[6vw]'
            }`}
          >
            <span className="text-[var(--color-primary-base)]">너</span>로 정했다!
          </h2>

          <div className={`mb-6 grid ${isDesktop ? 'grid-cols-7' : 'grid-cols-2 gap-4'}`}>
            <label className="flex items-center col-span-2 font-pm text-gray-700 break-keep">
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-5 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-[80%] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className={`mb-6 grid ${isDesktop ? 'grid-cols-7' : 'grid-cols-2 gap-4'}`}>
            <label className="flex items-center col-span-2 font-pm text-gray-700 break-keep">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-5 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-[80%] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="flex flex-col ">
            <button
              onClick={handleLogin}
              className="w-full mt-2 py-2 bg-[var(--color-primary-base)] font-ps text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition duration-200"
            >
              로그인
            </button>
            <button
              onClick={handlePasswordChange}
              className="w-full mt-2 py-2 font-ps text-gray-400 hover:text-gray-600 transition duration-200"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
