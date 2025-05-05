const Circle = ({ page, num }: { page: number; num: number }) => {
  return (
    <div
      className={`${num === page ? 'bg-[#F5506C]' : 'bg-[#D9D9D9]'} w-[10px] h-[10px] sm:w-[18px] sm:h-[18px] rounded-xl`}
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
