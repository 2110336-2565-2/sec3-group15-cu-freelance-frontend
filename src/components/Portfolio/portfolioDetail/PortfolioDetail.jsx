import tw from "twin.macro";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authClient } from "../../../utils/auth";
import { apiClient } from "../../../utils/axios";
import { AuthContext } from "../../../context/AuthProvider";
import ImageCarousel from "../ImageCarousel";
import { delay } from "../../../utils/delay";
import LoadingSpinner from "../../share/LoadingSpinner";
import { mapOptions } from "../../../store/portfolioForm";
import Button from "../../share/Button";

const Container = tw.div`h-auto w-full flex flex-col items-center font-ibm gap-y-3`;
const InfoContainer = tw.div`h-[70vh] w-full max-h-[75vh] overflow-y-auto flex flex-col items-center font-ibm gap-y-3`;
const LoadingContainer = tw.div`h-[30px] w-[100px]`;
const ImagesContainer = tw.div`h-[184px] w-full`;
const Header1 = tw.div`w-[90%] font-bold text-desktop-h1`;
const CategoryContainer = tw.div`w-[90%] text-freelance-pink font-bold`;
const HR = tw.hr`w-[90%] border-freelance-pink border-t-2 font-bold`;
const Li = tw.li`list-item font-bold text-desktop-h2`;
const Header2 = tw.ul`w-[90%] list-disc list-inside text-mobile-body`;
const Description = tw.div`w-[90%] justify-between`;
const SendContainer = tw.div`w-[90%] h-[15vh] flex flex-col`;
const ProfileContainer = tw.div`w-full h-1/2 flex gap-x-2 font-bold`;
const ButtonContainer = tw.div`w-full flex justify-between`;

const PortfolioDetail = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const portId = params.portId;
  const [images, setImages] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        // await delay(10000000);
        if (location.pathname.slice(0, 13) === "/my-portfolio") {
          response = await apiClient.get(`/portfolio/me/${portId}`);
        } else response = await authClient.get(`/portfolio/${portId}`);
        setPortfolio(response.data.portfolio);
        console.log(response);
        response = await authClient.get(`/file/portfolio/${portId}`);
        console.log(response);
        const imgs = response.data.urls.map((url) => "//" + url);
        setImages(imgs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const { id, category, description, duration, price, name, freelance } =
    portfolio || {
      id: null,
      category: null,
      description: null,
      duration: null,
      price: null,
      name: null,
      freelance: null,
    };

  //   const onClickSendHandler = (displayName, id) => {
  //     console.log(displayName, id);
  //     navigate("/create-order-request", {
  //       state: {
  //         displayName: displayName,
  //         id: id,
  //       },
  //     });
  //   };

  let show;
  if (portfolio) {
    show = (
      <>
        {" "}
        <InfoContainer>
          {" "}
          <ImagesContainer>
            {" "}
            {images && <ImageCarousel images={images} />}
          </ImagesContainer>
          <Header1>{name}</Header1>
          <HR />
          <CategoryContainer>{mapOptions[category]}</CategoryContainer>
          <Description>{description}</Description>
          <Header2>
            <Li>{`ระยะเวลา ${duration} วัน`}</Li>
            <Li>{`${price} บาท`}</Li>
          </Header2>
        </InfoContainer>
        <SendContainer>
          <ProfileContainer></ProfileContainer>
          <ButtonContainer></ButtonContainer>
        </SendContainer>
      </>
    );
  } else {
    show = (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container>{show}</Container>
    </>
  );
};

export default PortfolioDetail;
