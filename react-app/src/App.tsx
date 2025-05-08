import FontTest from '@/components/FontTest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WinnerCard from './components/WinnerCard/WinnerCard';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FontTest />
      <WinnerCard
        num={1}
        icon="island"
        text="무인도에서 가장 잘 살아남을 수 있을 것 같은 사람은?"
        name="진영호"
      />
    </QueryClientProvider>
  );
}

export default App;
