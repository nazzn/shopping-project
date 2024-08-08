import React, { useContext } from "react";
import "./App.css";
import Register from "./pages/register/authentication";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/profile/dashboard-page";
import HomePage from "./pages/public/home-page";
import AboutUsPage from "./pages/public/about-us-page";
import ProducPage from "./pages/products/products-list-page";
import PublicLayout from "./layouts/public-layout";
import CreateProdut from "./pages/products/create-product";
import LoginPage from "./pages/login/login-page";
import AuthContextProvider, { AuthContext } from "./contexts/auth-context";
import PaginatedItems from "./pages/products/page-product";

const AuthGaurd: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.authData.isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AuthGaurdReverse: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authCtx = useContext(AuthContext);
  if (authCtx.authData.isAuth) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/api/auth/login"
            element={
              <AuthGaurdReverse>
                <LoginPage />
              </AuthGaurdReverse>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/api/auth/register" element={<Register />} />
          <Route path="/api/products" element={<ProducPage />} />
          {/* Profile Routes */}
          <Route path="/api/admin/products" element={<CreateProdut />} />
          <Route
            path="/dashboard"
            element={
              <AuthGaurd>
                <DashboardPage />
              </AuthGaurd>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
