import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    // path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // add more routes...
    ],
  },
]);
export default router;
