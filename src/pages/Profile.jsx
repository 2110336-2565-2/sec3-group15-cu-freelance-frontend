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
import { useWindow } from "../hooks/window-hook";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import FreelanceProfileViewPage from "./FreelanceProfileView";
import SearchCorousel from "../components/searchPage/SearchCarousel";
import CustomerProfileView from "./CustomerProfileView";
const BG = tw.div`font-ibm relative min-h-[92vh] h-auto w-full max-w-[1400px] mx-auto pt-[10vh] flex justify-around mb-[3vh] flex-col`;
const PortfolioCardWrapper = tw.div`w-full flex flex-wrap gap-x-[2%] gap-y-[2vh] my-10 min-h-[65vh]`;

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [meta, setMeta] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [portfolios, setPortfolios] = useState(null);
  // console.log(portfolios);
  const windowSize = useWindow();
  const params = useParams();
  const userId = params.userId;

  const pageRef = React.createRef();
  const page = searchParams.get("pages") || "1";
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
  const handleInfiniteScrollNextPage = () => {
    if (page < meta.TotalPage) {
      searchParams.set("pages", parseInt(page) + 1);
      setSearchParams(searchParams);
    }
  };
  const onClickEditCard = (id, e) => {
    e.stopPropagation();
    navigate(`/portfolio/${id}/edit`);
  };

  const onClickDetailCard = (id) => {
    console.log(authCtx.userInfo.id, userId);
    if (authCtx.userInfo.id === userId) navigate(`/my-portfolio/${id}`);
    else navigate(`/portfolio/${id}`);
  };

  useEffect(() => {
    setSearchParams({ pages: 1 });
  }, [windowSize]);

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
        //
        let portIds = "";
        let ports = [...response.data.items];
        if (windowSize < 850 && page !== "1") {
          ports = [...portfolios, ...response.data.items];
        }
        ports.some((port) => {
          portIds += `${port.id},`;
        });
        if (portIds.length > 0) {
          portIds = portIds.slice(0, portIds.length - 1);
        }
        const data = [];
        const params = { id: portIds };
        const res_img = await authClient.get(
          `/file/portfolio/thumbnail?` + new URLSearchParams(params).toString()
        );
        console.log(res_img);
        const thumbnails = [...res_img.data.thumbnails];
        for (let i = 0; i < ports.length; i++) {
          data.push({
            ...ports[i],
            url: thumbnails[
              thumbnails.findIndex((thumbnail) => {
                return thumbnail.portId === ports[i].id;
              })
            ].url,
          });
        }
        console.log(data);
        setPortfolios(data);
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
  }, [user_type, page, params.userId]);
  console.log(authCtx.userInfo.user_type);
  return (
    <BG>
      {authCtx.userInfo.user_type == 1 ? (
        <>
          <FreelanceProfileViewPage freelance_id={userId} />
          <div tw="w-full dt:w-[65%] h-auto dt:min-h-[70vh] mx-auto flex flex-col items-center">
            {windowSize >= 850 ? (
              <>
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
                          portImg={portfolio.url}
                          category={portfolio.category}
                          name={portfolio.name}
                          description={portfolio.description}
                          duration={portfolio.duration}
                          price={portfolio.price}
                          canEdit={authCtx.userInfo.id === userId}
                          isPublic={portfolio.is_public}
                          onClick={onClickDetailCard.bind(null, portfolio.id)}
                          onClickPencil={onClickEditCard.bind(
                            null,
                            portfolio.id
                          )}
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
              </>
            ) : (
              <SearchCorousel
                ref={pageRef}
                portfolios={portfolios}
                isLoading={isLoading}
                handleInfiniteScroll={handleInfiniteScrollNextPage}
                canEdit={authCtx.userInfo.id === userId}
                handleClickDetailCard={onClickDetailCard}
                onClickPencil={onClickEditCard}
                setPortfolios={setPortfolios}
              />
            )}
          </div>
        </>
      ) : (
        <CustomerProfileView customer_id={userId} />
      )}
    </BG>
  );
};

export default ProfilePage;
