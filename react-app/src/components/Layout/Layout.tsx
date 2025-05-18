import { Outlet } from 'react-router-dom';
import Toast from '../Toast/Toast';
import Nav from '../Nav/Nav';

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen w-screen">
      <Toast />
      <Nav />
      <Outlet />
    </section>
  );
};

export default Layout;
