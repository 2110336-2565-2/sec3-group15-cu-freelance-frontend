import tw from "twin.macro";
import React from "react";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";
import CommentIndex from "../components/home/comment/Index";
import ValidateIndex from "../components/home/validate/Index";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategoryIndex />
      <CommentIndex />
      <ValidateIndex />
    </>
  );
};

export default HomePage;
