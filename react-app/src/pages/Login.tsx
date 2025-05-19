import { useCallback, useState } from 'react';
import { useLogin } from '@/hook/useLogin';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Loading from '@/components/Loading/Loading';
import { IMAGES } from '@/constants/imagePath';

const Login = () => {
  const navigate = useNavigate();
  const { login, isPending } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const handleLogin = useCallback(async () => {
    try {
      await login({ username, password });
    } catch (e) {
      setPassword('');
    }
  }, [login, username, password]);

  const handlePasswordChange = useCallback(() => {
    navigate('/change-password');
  }, [navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-2 py-10 bg-white overflow-y-auto">
      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl overflow-hidden">
        {isDesktop && (
          <div className="w-full md:w-1/2 flex justify-center items-center p-6">
            <img src={IMAGES.ROCKET} alt="로켓" className="max-w-[80%] h-auto object-contain" />
          </div>
        )}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="font-gumi font-bold text-center text-2xl md:text-3xl mb-8">
            <span className="text-[var(--color-primary-base)]">너</span>로 정했다!
          </h2>
          {isPending ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-pm mb-2">아이디</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-pm mb-2">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogin}
                  className="w-full py-2 bg-[var(--color-primary-base)] text-white font-ps rounded-lg hover:bg-[var(--color-primary-hover)] transition"
                >
                  로그인
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="w-full py-2 text-gray-400 font-ps hover:text-gray-600 transition"
                >
                  비밀번호 변경
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
