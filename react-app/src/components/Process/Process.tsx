const Circle = ({ page, num }: { page: number; num: number }) => {
  return (
    <div
      style={{ backgroundColor: num === page ? 'var(--color-primary-base)' : '#D9D9D9' }}
      className="w-[10px] h-[10px] sm:w-[18px] sm:h-[18px] rounded-xl"
    />
  );
};

const Process = ({ page }: { page: number }) => {
  return (
    <div className="w-[85px] sm:w-[192px] flex justify-between">
      <Circle page={page} num={1} />
      <Circle page={page} num={2} />
      <Circle page={page} num={3} />
      <Circle page={page} num={4} />
    </div>
  );
};

export default Process;
