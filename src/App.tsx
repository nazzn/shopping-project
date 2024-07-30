import React from "react";
import "./App.css";
import Register from "./pages/register/authentication";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/profile/dashboard-page";
import HomePage from "./pages/public/home-page";
import AboutUsPage from "./pages/public/about-us-page";
import ProducPage from "./pages/products/products-list-page";
import PublicLayout from "./layouts/public-layout";
import CreateProdut from "./pages/products/create-product";

const AuthGaurd: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLogin = true;
  if (!isLogin) return <Navigate to="/" />;

  return <>{children}</>;
};
function App() {
  return (
    <BrowserRouter>
      <PublicLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/api/auth/register" element={<Register />} />
          <Route path="/api/products" element={<ProducPage />} />
          {/* Profile Routes */}
          <Route path="" element={<CreateProdut/>}/>
          <Route
            path="/dashboard"
            element={
              <AuthGaurd>
                <DashboardPage />
              </AuthGaurd>
            }
          />
        </Routes>
      </PublicLayout>
    </BrowserRouter>
  );
}

export default App;
