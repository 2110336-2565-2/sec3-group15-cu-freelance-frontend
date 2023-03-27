import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import tw from "twin.macro";
import PortfolioImg from "../assets/PortfolioImage.svg";
import profile1 from "../assets/profile1.svg";
import Button from "../components/share/Button";
import LoadingSpinner from "../components/share/LoadingSpinner";
import PaginationBar from "../components/share/PaginationBar";
import PortfolioCard from "../components/share/PortfolioCard";
import ProfileCard from "../components/share/ProfileCard";
import { AuthContext } from "../context/AuthProvider";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";

const BG = tw.div`font-ibm relative min-h-[92vh] h-auto w-[100%] max-w-[1400px] mx-auto pt-[15vh] flex justify-around mb-[3vh]`;
const PortfolioCardWrapper = tw.div`w-full flex flex-wrap gap-x-[3%] gap-y-[2vh] my-10 min-h-[65vh]`;
const Header1 = tw.div`text-3xl font-ibm font-bold text-freelance-black-primary mb-[5vh] flex justify-between w-[100%] max-w-[800px]`;
const TextEng = tw.span`font-inter`;
const TextThai = tw.span`font-ibm`;

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [meta, setMeta] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [portfolios, setPortfolios] = useState(null);
  // console.log(portfolios);

  const params = useParams();
  const userId = params.userId;

  const pageRef = React.createRef();
  const page = searchParams.get("pages");
  const onNextPageHandler = () => {
    setSearchParams({ pages: parseInt(page) + 1 });
  };

  const onPrevPageHandler = () => {
    setSearchParams({ pages: parseInt(page) - 1 });
  };

  const onSetPageHandler = (event) => {
    event.preventDefault();
    const inputPage = parseInt(pageRef.current.value);
    const totalPage = parseInt(meta.TotalPage);
    pageRef.current.value = "";
    pageRef.current.blur();
    if (inputPage > totalPage) setSearchParams({ pages: totalPage });
    else if (inputPage < 1) setSearchParams({ pages: 1 });
    else setSearchParams({ pages: inputPage });
  };

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { display_name, user_type } = authCtx.userInfo;

  const onAddPortHandler = () => {
    navigate(`/profile/${params.userId}/add-portfolio`);
  };

  const onClickEditCard = (id, e) => {
    e.stopPropagation();
    navigate(`/portfolio/${id}/edit`);
  };

  const onClickDetailCard = (id) => {
    if (authCtx.userInfo.id === userId) navigate(`/my-portfolio/${id}`);
    else navigate(`/portfolio/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (authCtx.userInfo.id === userId) {
          response = await apiClient.get(`/portfolio/me?limit=6&page=${page}`);
        } else {
          response = await authClient.get(
            `/portfolio/user/${userId}?limit=6&page=${page}`
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
    const fetchData2 = async () => {
      setUserInfoLoading(true);
      try {
        let response;
        response = await authClient.get(`/user/freelance/${userId}`);
        console.log(response.data);
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
      setUserInfoLoading(false);
    };

    if (authCtx.userInfo.id !== userId) {
      fetchData2();
    }
    fetchData();
    console.log("fetch");
  }, [user_type, page, params.userId]);

  return (
    <BG>
      {userInfoLoading === false &&
        ((authCtx.userInfo.id !== userId && userInfo) ||
          authCtx.userInfo.id === userId) && (
          <ProfileCard
            imgSrc={profile1}
            name={
              authCtx.userInfo.id !== userId
                ? userInfo.display_name
                : display_name
            }
          />
        )}
      <div tw="w-[65%]  h-auto dt:min-h-[70vh]">
        {" "}
        <Header1>
          {user_type === 2 && authCtx.userInfo.id === userId && (
            <div tw="block">
              <TextEng>Profile</TextEng> <TextThai>ของ </TextThai>{" "}
              <TextEng> {display_name}</TextEng>
            </div>
          )}
          {user_type === 1 &&
            authCtx.userInfo.id === userId &&
            `งานของ ${display_name}`}
          {authCtx.userInfo.id !== userId &&
            userInfo &&
            `งานของ ${userInfo.display_name}`}
          {user_type === 1 && (
            <Button primary onClick={onAddPortHandler}>
              Add Portfolio
            </Button>
          )}
        </Header1>
        <PortfolioCardWrapper>
          {isLoading && <LoadingSpinner />}
          {!isLoading &&
            portfolios &&
            portfolios.map((portfolio, i) => {
              return (
                <PortfolioCard
                  id={portfolio.id}
                  setPortfolios={setPortfolios}
                  key={i}
                  portImg={PortfolioImg}
                  category={portfolio.category}
                  name={portfolio.name}
                  description={portfolio.description}
                  duration={portfolio.duration}
                  price={portfolio.price}
                  canEdit={authCtx.userInfo.id === userId}
                  isPublic={portfolio.is_public}
                  onClick={onClickDetailCard.bind(null, portfolio.id)}
                  onClickPencil={onClickEditCard.bind(null, portfolio.id)}
                />
              );
            })}
        </PortfolioCardWrapper>
        {portfolios && meta && meta.TotalPage !== 1 && (
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
