import tw from "twin.macro";
import React, { useContext } from "react";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";
import CommentIndex from "../components/home/comment/Index";
import ValidateIndex from "../components/home/validate/Index";
import Navbar from "../components/share/Navbar";
import { AuthContext } from "../context/AuthProvider";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Navbar login={!!authCtx.acToken}/>
      <Hero />
      <CategoryIndex />
      <CommentIndex />
      <ValidateIndex />
    </>
  );
};

export default HomePage;
