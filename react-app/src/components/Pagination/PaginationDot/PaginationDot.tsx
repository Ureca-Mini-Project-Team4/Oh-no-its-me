type PaginationDotProps = {
  isActive: boolean;
  onClick: () => void;
};

const PaginationDot = ({ isActive, onClick }: PaginationDotProps) => (
  <button
    onClick={onClick}
    aria-label="pagination-dot"
    className={`w-[10px] h-[10px] sm:w-[18px] sm:h-[18px] rounded-full transition-all duration-200
      ${isActive ? 'bg-[var(--color-primary-base)]' : 'bg-[#D9D9D9]'}
    `}
  />
);

export default PaginationDot;
