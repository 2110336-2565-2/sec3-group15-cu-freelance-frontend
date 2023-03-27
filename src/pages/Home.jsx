import React from "react";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";
import CommentIndex from "../components/home/comment/Index";
import ValidateIndex from "../components/home/validate/Index";
import Landing3 from "../components/home/page3/Landing3";
import Landing1 from "../components/home/page1/Landing1";
import Landing2 from "../components/home/page2/Landing2";
import Landing4 from "../components/home/page4/Landing4";

const HomePage = () => {
  return (
    <div tw="snap-y snap-mandatory min-h-screen">
      {/* <Landing1 />
      <Landing2 />
      <Landing3 /> */}
      <Landing4 />
      {/* <CategoryIndex /> */}
      {/* <CommentIndex /> */}
      {/* <ValidateIndex /> */}
    </div>
  );
};

export default HomePage;
