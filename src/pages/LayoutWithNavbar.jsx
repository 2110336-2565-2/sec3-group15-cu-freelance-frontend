import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/share/Navbar";

const LayoutWithNavbar = (props) => {
  return (
    <>
      <Navbar login={false} />
      <Outlet />
    </>
  );
};
export default LayoutWithNavbar;