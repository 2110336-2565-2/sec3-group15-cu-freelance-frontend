import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/share/Navbar";

const LayoutWithNavbar = (props) => {

  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?pages=1&limit=6&keyword=${searchResult}`);
  };

  const searchResultChangeHandler = (e) => {
    setSearchResult(e.target.value);
  };

  return (
    <>
      <Navbar
        login={!!props.acToken}
        fixed
        search
        searchResult={searchResult}
        onChange={searchResultChangeHandler}
        onSubmit={onSubmitHandler}

      />
      <Outlet />
    </>
  );
};
export default LayoutWithNavbar;
