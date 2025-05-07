import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setPage } from '@/store/slices/pageSlice';
import PaginationDot from './PaginationDot/PaginationDot';

type PaginationProps = {
  totalPages?: number;
};

const Pagination = ({ totalPages = 4 }: PaginationProps) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.page.currentPage);

  return (
    <div className="flex gap-2 sm:gap-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationDot
          key={i}
          isActive={currentPage === i + 1}
          onClick={() => dispatch(setPage((i + 1) as 1 | 2 | 3 | 4))}
        />
      ))}
    </div>
  );
};

export default Pagination;
