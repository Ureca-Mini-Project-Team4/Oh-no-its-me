import { useToast } from '@/hook/useToast';

export default function Home() {
  const { showToast } = useToast();

  const handleButtonClick = () => {
    showToast('버튼이 클릭되었습니다', 'success');
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleButtonClick}>토스트 표시</button>
    </div>
  );
}
