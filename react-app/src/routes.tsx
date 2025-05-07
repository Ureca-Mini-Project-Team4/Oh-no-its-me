import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Vote from './pages/Vote';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: 'vote',
        element: <Vote />,
      },
    ],
  },
]);

export default router;
