import { useNavigate } from 'react-router-dom';
import { IMAGES } from '@/constants/imagePath';
import Button from '@/components/Button/Button';

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-14 text-center bg-white">
      <div className="flex flex-col items-center max-w-md w-full">
        <img src={IMAGES.NOT_FOUND} alt="404 Not Found" className="mb-6 w-60 max-w-full h-auto" />
        <h1 className="text-xl sm:text-3xl font-bold mb-2">페이지를 찾을 수 없습니다😅</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
        </p>
        <Button label="홈으로 돌아가기" onClick={handleGoHome} size="full" />
      </div>
    </div>
  );
}
