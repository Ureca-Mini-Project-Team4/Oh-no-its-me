import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Vote from './pages/Vote';
import ChangePW from './pages/ChangePW';

const router = createBrowserRouter([
  {
    // path: '/',
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
      {
        path: 'change-password',
        element: <ChangePW />,
      },
    ],
  },
]);

export default router;
