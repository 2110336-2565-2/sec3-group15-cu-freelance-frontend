import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import LoginCustomer from "./pages/LoginCustomer";
import RegisterPage from "./pages/Register";
import RegisterSuccessPage from "./pages/RegisterSuccess";
import ProfilePage from "./pages/Profile";
import Auth from "./pages/Auth";
import Footer from "./components/share/Footer";
import LayoutWithNavbar from "./pages/LayoutWithNavbar";
import { AuthContext } from "./context/AuthProvider";
import { useAuth } from "./hooks/auth-hook";
import FillDisplayNamePage from "./pages/FillDisplayName";
import AddedPortfolioPage from "./pages/AddedPortfolio";
import PortfolioPage from "./pages/Portfolio";
import EditPortfolioPage from "./pages/EditPortfolio";
import EditProfilePage from "./pages/EditProfile";
import ChangePasswordPage from "./pages/ChangePassword";
import SearchPage from "./pages/Search";
import MyOrderPage from "./pages/MyOrder";

function App() {
  const { acToken, reToken, login, logout, userInfo, setUserInfo } = useAuth();
  return (
    <AuthContext.Provider
      value={{ userInfo, acToken, reToken, login, logout, setUserInfo }}
    >
      <Routes>
        <Route path="/" element={<LayoutWithNavbar acToken={acToken} />}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="portfolio/">
            <Route path=":portId/">
              <Route path="" element={<PortfolioPage />} />
              <Route path="edit/" element={<EditPortfolioPage />} />
            </Route>
          </Route>
          <Route path="my-portfolio/:portId/" element={<PortfolioPage />} />
          <Route path="profile/">
            <Route path=":userId/">
              <Route path="add-portfolio" element={<AddedPortfolioPage />} />
              <Route path="" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="/edit-profile" element={<EditProfilePage />}></Route>
          <Route
            path="/change-password"
            element={<ChangePasswordPage />}
          ></Route>
        </Route>
        <Route path="home" element={<HomePage />} />
        <Route path="/login/">
          <Route path="" element={<Login />} />
          <Route path="customer" element={<LoginCustomer />} />
        </Route>
        <Route path="my-order/" element={<MyOrderPage/>}/>
        <Route path="/register/" element={<RegisterPage />} />
        <Route path="success" element={<RegisterSuccessPage />} />
        <Route path="/fill-display-name" element={<FillDisplayNamePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="home" />} />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
