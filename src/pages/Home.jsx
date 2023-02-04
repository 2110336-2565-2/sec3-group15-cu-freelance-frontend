import Button from "../components/share/Button";
import tw from "twin.macro";
import PortfolioCard from "../components/share/PortfolioCard";
import ProfilePic from "../assets/ProfilePic.png"
import PortfolioImg from "../assets/PortfolioImg.png"
const HomePage = () => {
  return (
    <div>
      <PortfolioCard userImgSrc={ProfilePic} portImgSrc={PortfolioImg} name="Username123" description="ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ"/>
    </div>
  );
};

export default HomePage;
