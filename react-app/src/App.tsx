import FontTest from '@/components/FontTest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WinnerCardTest from './components/WinnerCardTest';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FontTest />
      <WinnerCardTest />
    </QueryClientProvider>
  );
}

export default App;
