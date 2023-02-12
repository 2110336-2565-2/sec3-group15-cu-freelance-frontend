import tw from "twin.macro";
import Hero from "../components/home/Hero";
import CategoryIndex from "../components/home/category/Index";
import CommentIndex from "../components/home/comment/Index";
import ValidateIndex from "../components/home/validate/Index";
import NavBar from "../components/share/Navbar";
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
