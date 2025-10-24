// src/layouts/MainLayout.tsx
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <HeaderNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
