import { useState } from 'react';
import Loading from '@/components/Loading/Loading';
import CommentContext from '@/components/Comment/CommentContext';

const CommentPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full min-h-screen flex justify-center items-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loading />
        </div>
      )}
      <CommentContext setIsLoading={setIsLoading} />
    </div>
  );
};

export default CommentPage;
