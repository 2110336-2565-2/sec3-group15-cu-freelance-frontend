import tw from "twin.macro";
import PortfolioCard from "../components/share/PortfolioCard";
import ProfilePic from "../assets/ProfilePic.png"
import PortfolioImg from "../assets/PortfolioImg.png"
import CategoryCard from "../components/share/CategoryCard";
import TrendingIcon from "../assets/CheckIcon.png"
import CommentCard from "../components/share/CommentCard";
const HomePage = () => {
  return (
    <div>
      {/* <CategoryCard imgSrc={TrendingIcon} title='Trending'/> */}
      {/* <PortfolioCard userImgSrc={ProfilePic} portImgSrc={PortfolioImg} name="Username123" description="ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ"/> */}
      <CommentCard comment="ใช้ CU Freelance ช่วยประหยัด เวลาได้มากเพราะมีตัวเลือก หลากหลายทั้งผลงานและรีวิว การันตีมั่นใจได้ว่าจะได้ผลงานตรงกับ ความต้องการของเรา จริงๆ"
                   imgSrc={ProfilePic}
                   name="เสือใหญ่ ใจดี"
                   position="Ceo of BooxBix"/>
    </div>
  );
};

export default HomePage;
