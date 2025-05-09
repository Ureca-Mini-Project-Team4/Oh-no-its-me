import { Outlet } from 'react-router-dom';
import Toast from '../Toast/Toast';

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Toast />
      <Outlet />
    </section>
  );
};

export default Layout;
