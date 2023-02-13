import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import PortfolioImg from "../assets/PortfolioImg.png";
import profile1 from "../assets/profile1.svg";
import AddPortfolioCard from "../components/share/AddPortfolioCard";
import Button from "../components/share/Button";
import PortfolioCard from "../components/share/PortfolioCard";
import ProfileCard from "../components/share/ProfileCard";
import { AuthContext } from "../context/AuthProvider";
import { authClient } from "../utils/auth";

const DUMMY_port = [
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
];

const ProfilePage = () => {
  const BG = tw.div`relative min-h-[92vh] h-auto w-[100%] max-w-[1400px] mx-auto pt-[15vh] flex justify-end mb-[3vh]`;
  const PortfolioCardWrapper = tw.div`w-[100%] flex flex-wrap gap-x-[3%] gap-y-[2vh]`;
  const Header1 = tw.div`text-4xl font-ibm font-bold text-[#D62B70] mb-[5vh] flex justify-between w-[95%]`;

  const params = useParams();
  const { userImg, name } = DUMMY_port[0];
  const [isLoading, setIsLoading] = useState(false);
  const [portfolios, setPortfolios] = useState(null);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { display_name, user_type } = authCtx.userInfo;
  const onAddPortHandler = () => {
    navigate(`/profile/${params.userId}/add-portfolio`);
  };

  const onClickEditCard = (id,e) => {
    e.stopPropagation();
    console.log('click pencil')
    navigate(`/portfolio/${id}/edit`);
  };

  const onClickDetailCard = (id) => {
    navigate(`/portfolio/${id}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await authClient.get("/portfolio/?limit=10&page=1");
        console.log(response.data);
        setPortfolios(response.data.items);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    if (user_type === 1) fetchData();
  }, [user_type]);

  return (
    <BG>
      <ProfileCard imgSrc={userImg} name={display_name} />
      <div tw="w-[65%]  h-auto">
        {" "}
        <Header1>
          {`งานของ ${display_name}`}
          {user_type === 1 && (
            <Button onClick={onAddPortHandler}>Add Portfolio</Button>
          )}
        </Header1>
        <PortfolioCardWrapper>
          {user_type === 1 && isLoading && "Loading..."}
          {user_type === 1 &&
            !isLoading &&
            portfolios &&
            portfolios.map((portfolio, i) => {
              return (
                <PortfolioCard
                  key={i}
                  userImgSrc={profile1}
                  portImgSrc={PortfolioImg}
                  name={"User"}
                  description={portfolio.name_th}
                  isClose={!portfolio.is_public}
                  onClick={onClickDetailCard.bind(null,portfolio.id)}
                  onPencilClick={onClickEditCard.bind(null,portfolio.id)}
                />
              );
            })}
        </PortfolioCardWrapper>
      </div>
    </BG>
  );
};

export default ProfilePage;
