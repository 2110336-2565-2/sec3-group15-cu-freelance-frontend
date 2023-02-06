import tw from "twin.macro";
import Hero from "../components/Home/Hero";
import CategoryIndex from "../components/Home/category/Index";
import CommentIndex from "../components/Home/comment/Index";
import ValidateIndex from "../components/Home/validate/Index";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <CategoryIndex />
      <CommentIndex />
      <ValidateIndex />
    </div>
  );
};

export default HomePage;
