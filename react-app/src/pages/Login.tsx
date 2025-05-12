import { useState } from 'react';
import { useAuth } from '@/hook/useAuth';

const Login = () => {
  const { login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (e) {
      console.error(e);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="font-gumi text-2xl font-bold text-center mb-6">
          <span className="text-(--color-primary-base)">너</span>로 정했다!
        </h2>
        <div className="mb-4">
          <label className="font-pm block text-gray-700 mb-2">아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary-base)/70"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="mb-6">
          <label className="font-pm block text-gray-700 mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary-base)/70"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-(--color-primary-base) text-white font-semibold rounded-lg hover:bg-(--color-primary-hover) transition duration-200"
        >
          로그인
        </button>
        <button
          onClick={logout}
          className="mt-4 w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Login;
