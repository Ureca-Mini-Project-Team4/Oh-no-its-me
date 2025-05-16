import { useCallback, useState } from 'react';
import { changePassword } from '@/apis/user/changePassword';
import { useToast } from '@/hook/useToast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const ChangePW = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { showToast } = useToast();
  const navigation = useNavigate();

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const handleChangePassword = async () => {
    try {
      await changePassword({
        username,
        old_password: oldPassword,
        new_password: newPassword,
      });

      setUsername('');
      setOldPassword('');
      setNewPassword('');

      navigation('/login');
      showToast('비밀번호가 성공적으로 변경되었습니다.', 'success');
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

  const handlePrev = useCallback(() => {
    navigation('/login');
  }, []);

  return (
    <div
      className={`flex justify-center items-center w-screen h-screen ${isDesktop ? 'text-[1.2vw]' : 'text-[2.5vw]'}`}
    >
      <div className="flex justify-center items-center w-[70%] max-w-[900px] h-[80%] rounded-2xl">
        {isDesktop && (
          <img
            src="/assets/images/seal-change-password.png"
            alt="물개"
            className="w-[40%] aspect-square flex justify-center items-center object-contain m-5"
          />
        )}
        <div
          className={`flex flex-col justify-center ${isDesktop ? 'w-1/2 px-8' : 'w-full px-6 gap-[2vw]'}`}
        >
          <h2 className={`font-gumi text-center mb-8 ${isDesktop ? 'text-[3vw]' : 'text-[6vw]'}`}>
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
              기존 비밀번호
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="col-span-5 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-[80%] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
              placeholder="기존 비밀번호를 입력하세요"
            />
          </div>

          <div className={`mb-6 grid ${isDesktop ? 'grid-cols-7' : 'grid-cols-2 gap-4'}`}>
            <label className="flex items-center col-span-2 font-pm text-gray-700 break-keep">
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="col-span-5 w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-[80%] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]/70"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>

          <div className="flex flex-col">
            <button
              onClick={handleChangePassword}
              className="w-full mt-2 py-2 bg-[var(--color-primary-base)] font-ps text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition duration-200"
            >
              확인
            </button>
            <button
              onClick={handlePrev}
              className="flex justify-center items-center gap-[1vw] w-full mt-2 py-2 font-ps text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <img
                className={`${isDesktop ? 'size-[1.8vw]' : 'size-[3vw]'} aspect-square`}
                src="/assets/images/vector.png"
              />
              이전으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePW;
