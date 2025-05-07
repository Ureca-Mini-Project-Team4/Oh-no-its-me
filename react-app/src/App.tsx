import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FontTest from '@/components/FontTest';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FontTest />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
