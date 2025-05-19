import { useCallback, useState } from 'react';
import { useToast } from '@/hook/useToast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/apis/user/changePassword';
import { IMAGES } from '@/constants/imagePath';

const ChangePW = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { showToast } = useToast();
  const navigation = useNavigate();

  const { mutate: changePasswordMutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      setUsername('');
      setOldPassword('');
      setNewPassword('');
      navigation('/login');
      showToast('비밀번호가 성공적으로 변경되었습니다.', 'success');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message =
          typeof error.response?.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response?.data || error.message);
        showToast(message, 'warning');
      } else {
        showToast(String(error), 'warning');
      }
      console.error(error);
    },
  });

  const handleSubmit = useCallback(() => {
    changePasswordMutate({
      username,
      old_password: oldPassword,
      new_password: newPassword,
    });
  }, [username, oldPassword, newPassword]);

  const handlePrev = useCallback(() => {
    navigation('/login');
  }, [navigation]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white overflow-hidden gap-8">
        {isDesktop && (
          <div className="flex justify-center items-center w-full md:w-[50%] p-4">
            <img
              src={IMAGES.SEAL_CHANGE_PASSWORD}
              alt="물개"
              className="max-w-full h-auto object-contain"
            />
          </div>
        )}
        <div className="flex flex-col justify-center w-full md:w-[50%] p-6 gap-6">
          <h2 className="font-gumi text-center text-[24px] md:text-[32px] mb-4">
            <span className="text-[var(--color-primary-base)]">너</span>로 정했다!
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-pm text-gray-700 mb-1">아이디</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
                placeholder="아이디를 입력하세요"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-pm text-gray-700 mb-1">기존 비밀번호</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
                placeholder="기존 비밀번호를 입력하세요"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-pm text-gray-700 mb-1">새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
                placeholder="새 비밀번호를 입력하세요"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-[var(--color-primary-base)] font-ps text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition duration-200"
            >
              확인
            </button>
            <button
              onClick={handlePrev}
              className="flex justify-center items-center gap-2 w-full py-2 font-ps text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <img src={IMAGES.ARROW_LEFT} alt="뒤로가기" className="w-5 h-5" />
              이전으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePW;
