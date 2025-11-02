import { Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <HeaderNav showHero={false} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;