import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderNav from "./layout/HeaderNav";
import MainLayout from "./layout/MainLayout";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./features/auth/Login"));
const Register = lazy(() => import("./features/auth/Register"));

function App() {
  return (
    <>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          {/* Routes without layout */}

          {/* Routes with layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
