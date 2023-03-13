import tw from "twin.macro";
import PortfolioExample from "../assets/PortfolioExample.svg";
import DurationIcon from "../assets/DurationIcon.svg";
import ProfileCard from "../components/share/ProfileCard2";
import UserImage from "../assets/profile1.svg";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import { onClickSend } from "../utils/order";

const PortfolioPage = () => {
  const Container = tw.div`flex flex-col text-left my-[15vh] mx-auto px-20 text-[#D62B70] font-ibm gap-y-12 max-w-[1200px]`;
  const FirstRow = tw.div`flex w-full justify-between`;
  const Path = tw.div`font-ibm font-bold text-sm`;
  const Image = tw.img`self-center rounded-[30px] border-[#D62B70] border-8`;
  const Title = tw.h1`font-bold text-3xl`;
  const Description = tw.p`font-bold text-lg whitespace-pre-wrap`;
  const Duration = tw.div`flex items-center font-bold text-2xl`;
  const ImageDuration = tw.img`mr-2`;

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const id = params.portId;
  const [portfolio, setPortfolio] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (location.pathname.slice(0, 13) === "/my-portfolio") {
          response = await apiClient.get(`/portfolio/me/${id}`);
        } else response = await authClient.get(`/portfolio/${id}`);
        setPortfolio(response.data.portfolio);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onClickSendHandler = (displayName, id) => {
    console.log(displayName, id);
    navigate();
  };

  let show;
  if (portfolio) {
    show = (
      <>
        {" "}
        <Path>
          {`ประเภทงานทั้งหมด > ${portfolio.category} >  ${portfolio.name}`}
        </Path>
        <Image src={PortfolioExample}></Image>
        <FirstRow>
          <Title>{portfolio.name}</Title> <Title>{portfolio.price} บาท</Title>
        </FirstRow>
        <Description>{portfolio.description}</Description>
        <Duration>
          <ImageDuration src={DurationIcon} />
          {`${portfolio.duration} Day`}
        </Duration>
        <ProfileCard
          onClick={onClickSendHandler.bind(
            null,
            portfolio.freelance.display_name,
            portfolio.freelance.id
          )}
          userImage={UserImage}
          username={portfolio.freelance.display_name}
          portCount={11}
          avgTime={5}
        />
      </>
    );
  } else {
    show = "Loading...";
  }

  return <Container>{show}</Container>;
};
export default PortfolioPage;
