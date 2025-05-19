import { Outlet } from 'react-router-dom';
import Toast from '../Toast/Toast';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <section className="flex flex-col h-screen">
      <Toast />
      <Header />
      <Outlet />
    </section>
  );
};

export default Layout;
