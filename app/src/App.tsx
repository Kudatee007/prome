import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Professionals from "./pages/professionals/Professionals";
import AppLayout from "./layout/AppLayout";
import ProfessionalProfile from "./pages/professionals/ProfessionalProfile";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./features/auth/Login"));
const Register = lazy(() => import("./features/auth/Register"));

function App() {
  return (
    <>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          {/* Routes with hero */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Routes without hero */}
          <Route element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/professional-profile" element={<ProfessionalProfile />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
