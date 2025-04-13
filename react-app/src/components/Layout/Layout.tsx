import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Outlet />
    </section>
  );
};

export default Layout;
