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
import CreatePortfolioPage from "./pages/CreatePortfolio";
import PortfolioPage from "./pages/Portfolio";
import EditPortfolioPage from "./pages/EditPortfolio";
import EditProfilePage from "./pages/EditProfile";
import ChangePasswordPage from "./pages/ChangePassword";
import SearchPage from "./pages/Search";
import MyOrderPage from "./pages/MyOrder";
import CreateOrderTemplatePage from "./pages/CreateOrderTemplate";
import RequestCompletePage from "./pages/RequestComplete";
import CreateOrderRequest from "./pages/CreateOrderRequest";
import UserSettingEntrancePage from "./pages/UserSettingEntrance";
import UserSettingEntranceDtPage from "./pages/UserSettingEntranceDt";
<<<<<<< HEAD
import IssueReportPage from "./pages/IssueReport";

=======
import ChatEntrancePage from "./pages/ChatEntrance";
>>>>>>> 5464a24 (Updated Chat)
function App() {
  const { acToken, reToken, login, logout, userInfo, setUserInfo } = useAuth();
  return (
    <AuthContext.Provider
      value={{ userInfo, acToken, reToken, login, logout, setUserInfo }}
    >
      <Routes>
        <Route path="/" element={<LayoutWithNavbar acToken={acToken} />}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="support" element={<IssueReportPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="portfolio/">
            <Route path=":portId/">
              <Route path="" element={<PortfolioPage />} />
              <Route path="edit/" element={<EditPortfolioPage />} />
            </Route>
          </Route>
          <Route path="my-portfolio/:portId/" element={<PortfolioPage />} />
          <Route path="profile/">
            <Route path=":userId/">
              <Route path="add-portfolio" element={<CreatePortfolioPage />} />
              <Route path="" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="/edit-profile" element={<EditProfilePage />}></Route>
          <Route
            path="/change-password"
            element={<ChangePasswordPage />}
          ></Route>
          <Route
            path="/create-order-template"
            element={<CreateOrderTemplatePage />}
          ></Route>
          <Route
            path="/request-complete"
            element={<RequestCompletePage />}
          ></Route>
          <Route
            path="/create-order-request"
            element={<CreateOrderRequest />}
          ></Route>
          <Route path="success" element={<RegisterSuccessPage />} />
          <Route
            path="/user-setting-entrance"
            element={<UserSettingEntrancePage />}
          />
          <Route
            path="/user-setting-entrance-dt"
            element={<UserSettingEntranceDtPage />}
          />
          <Route
            path="/chat"
            element={<ChatEntrancePage/>}
          />
        </Route>
        <Route path="/login/">
          <Route path="" element={<Login />} />
          <Route path="customer" element={<LoginCustomer />} />
        </Route>
        <Route path="my-order/" element={<MyOrderPage />} />
        <Route path="/register/" element={<RegisterPage />} />
        <Route path="/fill-display-name" element={<FillDisplayNamePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/user-setting-entrance" element={<UserSettingEntrancePage/>}/> */}
        <Route path="*" element={<Navigate to="home" />} />
      </Routes>
      <Footer isLogin={!!acToken} />
    </AuthContext.Provider>
  );
}

export default App;
