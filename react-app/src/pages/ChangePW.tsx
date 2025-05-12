import { useState } from 'react';
import { changePassword } from '@/apis/user/changePassword';
import { useToast } from '@/hook/useToast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePW = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { showToast } = useToast();
  const navigation = useNavigate();

  const handleChangePassword = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('로그인 정보 없음');

      await changePassword(userId, {
        old_password: oldPassword,
        new_password: newPassword,
      });

      setOldPassword('');
      setNewPassword('');

      navigation('/main');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          showToast(error.message, 'warning');
        } else {
          const message =
            typeof error.response?.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response?.data);

          showToast(message, 'warning');
        }
      } else {
        showToast(String(error), 'warning');
      }
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto  ">
      <h2 className="text-xl font-bold mb-6 text-center">비밀번호 변경 테스트</h2>
      <div className="mb-4">
        <label className="font-pm block mb-1">현재 비밀번호</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label className="font-pm block mb-1">새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
        />
      </div>
      <button onClick={handleChangePassword} className="w-full py-2 text-black rounded ">
        변경하기
      </button>
    </div>
  );
};

export default ChangePW;
