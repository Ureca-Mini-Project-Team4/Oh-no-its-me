const FontTest = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-pl">이것은 Pretendard Light 폰트입니다.</p>
      <p className="font-pr">이것은 Pretendard Regular 폰트입니다.</p>
      <p className="font-pm">이것은 Pretendard Medium 폰트입니다.</p>
      <p className="font-ps">이것은 Pretendard SemiBold 폰트입니다.</p>
      <p className="font-pb">이것은 Pretendard Bold 폰트입니다.</p>
      <div className="bg-orange-gradient font-gumi w-40 h-40">배경 테스트</div>
    </div>
  );
};

export default FontTest;
