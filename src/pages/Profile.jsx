import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "twin.macro";
import PortfolioImg from "../assets/PortfolioImg.png";
import profile1 from "../assets/profile1.svg";
import AddPortfolioCard from "../components/share/AddPortfolioCard";
import Button from "../components/share/Button";
import PaginationBar from "../components/share/PaginationBar";
import PortfolioCard from "../components/share/PortfolioCard";
import ProfileCard from "../components/share/ProfileCard";
import { AuthContext } from "../context/AuthProvider";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";

const DUMMY_port = [
  {
    userImg: profile1,
    img: PortfolioImg,
    name: "Username123",
    description: "ออกแบบเว็บไซต์ Web Design งานคุณภาพราคาโดนๆ",
  },
];

const ProfilePage = () => {
  const BG = tw.div`relative min-h-[92vh] h-auto w-[100%] max-w-[1400px] mx-auto pt-[15vh] flex flex-col items-end mb-[3vh]`;
  const PortfolioCardWrapper = tw.div`w-[100%] flex flex-wrap gap-x-[3%] gap-y-[2vh] my-10 min-h-[65vh]`;
  const Header1 = tw.div`text-4xl font-ibm font-bold text-[#D62B70] mb-[5vh] flex justify-between w-[95%] max-w-[715px]`;

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const params = useParams();
  const { userImg, name } = DUMMY_port[0];
  const userId = params.userId;
  const [isLoading, setIsLoading] = useState(false);
  const [portfolios, setPortfolios] = useState(null);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { display_name, user_type } = authCtx.userInfo;
  const pageRef = React.createRef();

  const onAddPortHandler = () => {
    navigate(`/profile/${params.userId}/add-portfolio`);
  };

  const onClickEditCard = (id, e) => {
    e.stopPropagation();
    navigate(`/portfolio/${id}/edit`);
  };

  const onClickDetailCard = (id) => {
    if (authCtx.userInfo.id === userId) navigate(`/portfolio/me/${id}`);
    else navigate(`/portfolio/${id}`);
  };

  const onNextPageHandler = () => {
    setPage((prev) => prev + 1);
  };

  const onPrevPageHandler = () => {
    setPage((prev) => prev - 1);
  };

  const onSetPageHandler = (event) => {
    event.preventDefault();
    const inputPage = parseInt(pageRef.current.value);
    const totalPage = parseInt(meta.TotalPage);
    pageRef.current.value = "";
    pageRef.current.blur();
    if (inputPage > totalPage) setPage(totalPage);
    else if (inputPage < 1) setPage(1);
    else setPage(inputPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (authCtx.userInfo.id === userId) {
          response = await apiClient.get(`/portfolio/me/?limit=6&page=${page}`);
        } else {
          response = await apiClient.get(
            `/portfolio/user/${userId}/?limit=6&page=${page}`
          );
        }
        console.log(response.data);
        setPortfolios(response.data.items);
        setMeta(response.data.meta);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user_type, page]);

  return (
    <BG>
      <ProfileCard imgSrc={userImg} name={display_name} />
      <div tw="w-[65%]  h-auto dt:min-h-[70vh]">
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
                  name={portfolio.freelance.display_name}
                  description={portfolio.name}
                  isClose={!portfolio.is_public}
                  onClick={onClickDetailCard.bind(null, portfolio.id)}
                  onPencilClick={onClickEditCard.bind(null, portfolio.id)}
                  hasPencil={authCtx.userInfo.id===userId}
                />
              );
            })}
        </PortfolioCardWrapper>
        {portfolios && meta && (
          <PaginationBar
            page={page}
            ref={pageRef}
            totalPage={meta.TotalPage}
            onPrev={onPrevPageHandler}
            onNext={onNextPageHandler}
            onSet={onSetPageHandler}
          />
        )}
      </div>
    </BG>
  );
};

export default ProfilePage;
