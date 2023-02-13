import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import LoginCustomer from "./pages/LoginCustomer";
import RegisterPage from "./pages/Register";
import RegisterSuccessPage from "./pages/RegisterSuccess"
import ProfilePage from "./pages/Profile";
import Auth from "./pages/Auth";
import Footer from "./components/share/Footer";
import LayoutWithNavbar from "./pages/LayoutWithNavbar";
import { AuthContext } from "./context/AuthProvider";
import { useAuth } from "./hooks/auth-hook";
import FillDisplayNamePage from "./pages/FillDisplayName";
import AddedPortfolioPage from "./pages/AddedPortfolio";
import { SSO_URL } from "./config/env";
import PortfolioPage from "./pages/Portfolio";

function App() {
  
  const { acToken, reToken, login, logout, userInfo } = useAuth();
  return (
    <AuthContext.Provider value={{ userInfo, acToken, reToken, login, logout }}>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar acToken={acToken} />}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile/">
            <Route path=":userId/">
              <Route path=":portId" element={<PortfolioPage/>}/>
              <Route path="add-portfolio" element={<AddedPortfolioPage />} />
              <Route path="" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login/">
          <Route path="" element={<Login />} />
          <Route path="customer" element={<LoginCustomer />} />
        </Route>
        <Route path="/register/" element={<RegisterPage />} />
          <Route path="success" element={<RegisterSuccessPage/>} />
        <Route path="/fill-display-name" element={<FillDisplayNamePage/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="home" />} />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
