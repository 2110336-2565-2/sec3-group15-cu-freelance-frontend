import tw from "twin.macro";
import React, { useContext } from "react";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";
import CommentIndex from "../components/home/comment/Index";
import ValidateIndex from "../components/home/validate/Index";
import Landing3 from "../components/home/page3/Landing3";
import Landing1 from "../components/home/page1/Landing1";
import Landing2 from "../components/home/page2/Landing2";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Landing2 />
      <CategoryIndex />
      <CommentIndex />
      <Landing3 />
      <ValidateIndex />
    </>
  );
};

export default HomePage;
