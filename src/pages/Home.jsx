import tw from "twin.macro";

import Button from "../components/share/Button";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CategoryIndex />
    </div>
  );
};

export default HomePage;
