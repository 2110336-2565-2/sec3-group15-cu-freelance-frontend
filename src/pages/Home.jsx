import tw from "twin.macro";
import CategoryIndex from "../components/Home/category/Index";
import CommentIndex from "../components/Home/comment/Index";
import Hero from "../components/Home/Hero";
const HomePage = () => {
  return (
    <div>
      <Hero/>
      <CategoryIndex/>
      <CommentIndex/>
    </div>
  );
};

export default HomePage;
