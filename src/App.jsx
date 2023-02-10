import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import LoginCustomer from './pages/LoginCustomer'
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import Auth from "./pages/Auth";
import Footer from "./components/share/Footer";
import LayoutWithNavbar from "./pages/LayoutWithNavbar";
import { AuthContext } from "./context/AuthProvider";
import { useAuth } from "./hooks/auth-hook";

function App() {

  const {acToken, reToken, login, logout, userInfo }=useAuth()
  
  return (
    <AuthContext.Provider value={{userInfo,acToken,reToken,login,logout}}>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar acToken={acToken}/>}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile/">
            <Route path=":userId/" element={<ProfilePage />}>
              <Route path="" element={<ProfilePage />} />
              <Route path="add-portfolio" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login/">
          <Route path="" element={<Login />} />
          <Route path="customer" element={<LoginCustomer/>} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<Auth/>}/>
        <Route path="*" element={<Navigate to="home" />} />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
