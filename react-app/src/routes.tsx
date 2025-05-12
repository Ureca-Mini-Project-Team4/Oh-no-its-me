import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Vote from './pages/Vote';
import ChangePW from './pages/ChangePW';
import Result from './pages/Result';
import Main from './pages/Main';
import Comment from './pages/Comment';
import ErrorBoundary from './pages/ErrorBoundary';

const router = createBrowserRouter([
  {
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
        path: '/result',
        element: <Result />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/comment',
        element: <Comment />,
      },
      {
        path: '*',
        element: <ErrorBoundary />,
      },
    ],
  },
]);

export default router;
