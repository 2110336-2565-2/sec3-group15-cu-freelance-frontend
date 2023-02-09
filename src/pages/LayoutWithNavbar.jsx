import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/share/Navbar";

const LayoutWithNavbar = ({acToken}) => {
  
  return (
    <>
      <Navbar login={!!acToken} />
      <Outlet />
    </>
  );
};
export default LayoutWithNavbar;