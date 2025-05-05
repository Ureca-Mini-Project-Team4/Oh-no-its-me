import FontTest from '@/components/FontTest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FontTest />
    </QueryClientProvider>
  );
}

export default App;
