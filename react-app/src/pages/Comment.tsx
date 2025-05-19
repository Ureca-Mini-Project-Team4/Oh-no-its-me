import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import CommentContext from '@/components/Comment/CommentContext';
import { useNavigate } from 'react-router-dom';

const CommentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;
    navigate('/main');
  }, [error, navigate]);

  return (
    <div className="md:pt-0 pt-130 relative w-full h-full min-h-screen flex justify-center items-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loading />
        </div>
      )}
      <CommentContext setIsLoading={setIsLoading} onError={setError} />
    </div>
  );
};

export default CommentPage;
