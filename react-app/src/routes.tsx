import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Vote from './pages/Vote';
import ChangePW from './pages/ChangePW';
import Candidate from './pages/Candidate';
import Poll from './pages/Poll';

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
      {
        path: 'candidate',
        element: <Candidate />,
      },
      {
        path: 'poll',
        element: <Poll />,
      },
    ],
  },
]);

export default router;
