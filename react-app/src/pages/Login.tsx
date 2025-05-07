import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/slices/authSlice';
import { login } from '@/apis/user/login';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });
      const { user } = response;

      dispatch(
        setAuth({
          user,
          accessToken: null,
          refreshToken: null,
        }),
      );

      alert('로그인 성공!');
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">로그인 테스트 페이지</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
