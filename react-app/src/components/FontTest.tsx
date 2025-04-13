const FontTest = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-pl">이것은 Pretendard Light 폰트입니다.</p>
      <p className="font-pr">이것은 Pretendard Regular 폰트입니다.</p>
      <p className="font-pm">이것은 Pretendard Medium 폰트입니다.</p>
      <p className="font-ps">이것은 Pretendard SemiBold 폰트입니다.</p>
      <p className="font-pb">이것은 Pretendard Bold 폰트입니다.</p>
      <p className="text-(--primary-base)">프라이머리 색상 텍스트</p>
    </div>
  );
};

export default FontTest;
