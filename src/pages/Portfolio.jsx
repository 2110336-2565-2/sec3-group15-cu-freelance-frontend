import tw from "twin.macro";
import PortfolioExample from "../assets/PortfolioExample.svg";
import ProfileCard from "../components/share/ProfileCard2";
import UserImage from "../assets/profile1.svg";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";

const PortfolioPage = () => {
  const Container = tw.div`flex flex-col text-left my-[15vh] mx-auto px-20 text-[#D62B70] font-ibm gap-y-12 max-w-[1200px]`;
  const Path = tw.div`font-ibm font-bold text-sm`;
  const Image = tw.img`self-center rounded-[30px] border-[#D62B70] border-8`;
  const Title = tw.h1`font-bold text-3xl`;
  const Description = tw.p`font-bold text-lg whitespace-pre-wrap`;

  const params = useParams();
  const location = useLocation();
  const id = params.portId;
  const [portfolio, setPortfolio] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (location.pathname.slice(0, 13) === "/my-portfolio"){
          response = await apiClient.get(`/portfolio/me/${id}`);
          console.log("true")
        }
        else response = await authClient.get(`/portfolio/${id}`);
        setPortfolio(response.data.portfolio);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  let show;
  if (portfolio) {
    show = (
      <>
        {" "}
        <Path>
          {`ประเภทงานทั้งหมด > ${portfolio.category} >  ${portfolio.name}`}
        </Path>
        <Image src={PortfolioExample}></Image>
        <Title>{portfolio.name}</Title>
        <Description>{portfolio.description}</Description>
        <ProfileCard
          userImage={UserImage}
          username="Username123"
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
