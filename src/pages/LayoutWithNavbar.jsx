import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/share/Navbar";

const LayoutWithNavbar = ({acToken}) => {
  
  return (
    <>
      <Navbar login={!!acToken} fixed search/>
      <Outlet />
    </>
  );
};
export default LayoutWithNavbar;