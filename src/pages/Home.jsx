import tw from "twin.macro";
import React, { useContext } from "react";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";
import CommentIndex from "../components/home/comment/Index";
import ValidateIndex from "../components/home/validate/Index";
import Landing3 from "../components/home/page3/Landing3";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategoryIndex />
      <CommentIndex />
      <Landing3 />
      <ValidateIndex />
    </>
  );
};

export default HomePage;
