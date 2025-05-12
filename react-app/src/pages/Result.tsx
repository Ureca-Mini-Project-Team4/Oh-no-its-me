const Result = () => {
  return (
    <div className="relative w-full h-screen bg-responsive">
      {/* 내용 */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
        <div className="flex flex-row items-center justify-center mb-6">
          <img src="/assets/images/popper-left.png" alt="popper" className="w-10 sm:w-15 h-auto" />
          <h1 className="font-pb text-2xl text-black mx-4">너로 정했다!</h1>
          <img src="/assets/images/popper-right.png" alt="popper" className="w-10 sm:w-15 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Result;
