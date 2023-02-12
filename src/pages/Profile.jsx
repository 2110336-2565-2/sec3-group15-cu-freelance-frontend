import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import PortfolioImg from "../assets/PortfolioImg.png";
import profile1 from "../assets/profile1.svg";
import AddPortfolioCard from "../components/share/AddPortfolioCard";
import PortfolioCard from "../components/share/PortfolioCard";
import ProfileCard from "../components/share/ProfileCard";
import { authClient } from "../utils/auth";

const DUMMY_port = [
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆๆๆๆ",
    isClose: true,
  },
];

const ProfilePage = () => {
  const BG = tw.div`relative min-h-[87vh] h-auto w-[100%] max-w-[1400px] mx-auto pt-[15vh] flex justify-end mb-[3vh]`;
  const PortfolioCardWrapper = tw.div`w-[100%] flex flex-wrap gap-x-[3%] gap-y-[2vh]`;
  const Header1 = tw.div`text-4xl font-ibm font-bold text-[#D62B70] mb-[5vh]`;
  const params = useParams();
  const { userImg, name } = DUMMY_port[0];
  const navigate = useNavigate();
  const onAddPortHandler = () => {
    navigate(`/profile/${params.userId}/add-portfolio`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authClient.get("/portfolio/?limit=10&page=1");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <BG>
      <ProfileCard imgSrc={userImg} name={name} />
      <div tw="w-[65%]  h-auto">
        {" "}
        <Header1>{`งานของ Username123`}</Header1>
        <PortfolioCardWrapper>
          {DUMMY_port.map((portfolio, i) => {
            if (i == 0)
              return <AddPortfolioCard key={i} onClick={onAddPortHandler} />;
            else
              return (
                <PortfolioCard
                  key={i}
                  userImgSrc={portfolio.userImg}
                  portImgSrc={portfolio.img}
                  name={portfolio.name}
                  description={portfolio.description}
                  isClose={portfolio.isClose}
                />
              );
          })}
        </PortfolioCardWrapper>
      </div>
    </BG>
  );
};

export default ProfilePage;
