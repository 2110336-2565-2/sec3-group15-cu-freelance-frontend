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
import CircleImage from "../../share/CircleImage";

const Container = tw.div`h-auto w-full flex flex-col items-center font-ibm gap-y-3`;
const InfoContainer = tw.div`h-[70vh] w-full max-h-[70vh] overflow-y-auto flex flex-col items-center font-ibm gap-y-3`;
const LoadingContainer = tw.div`h-[30px] w-[100px]`;
const ImagesContainer = tw.div`h-[184px] w-full`;
const Header1 = tw.div`w-[90%] font-bold text-desktop-h1`;
const CategoryContainer = tw.div`w-[90%] text-freelance-pink font-bold`;
const HR = tw.hr`w-[90%] border-freelance-pink border-t-2 font-bold`;
const Li = tw.li`list-item font-bold text-desktop-h2`;
const Header2 = tw.ul`w-[90%] list-disc list-inside text-mobile-body`;
const Description = tw.div`w-[90%] justify-between`;
const SendContainer = tw.div`w-[90%] h-[20vh] mb-5 flex flex-col items-center rounded-[8px] shadow-[0_8px_4px_rgba(0,0,0,0.25)]`;
const ProfileContainer = tw.div`w-[90%] h-1/2 flex gap-x-2 font-bold items-center`;
const ButtonContainer = tw.div`w-[90%] flex justify-between`;

const PortfolioDetail = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const portId = params.portId;
  const [images, setImages] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        setIsLoading(true);
        // await delay(10000000);
        if (location.pathname.slice(0, 13) === "/my-portfolio") {
          response = await apiClient.get(`/portfolio/me/${portId}`);
        } else response = await authClient.get(`/portfolio/${portId}`);
        setPortfolio(response.data.portfolio);
        const freelanceId = response.data.portfolio.freelance.id;
        // console.log(response);
        response = await authClient.get(`/file/portfolio/${portId}`);
        // console.log(response);
        setImages(response.data.urls);
        response = await authClient.get(`/file/avatar?id=${freelanceId}`);
        // console.log(response.data.avatars[0]);
        setProfileImg(response.data.avatars[0].url);
        console.log(response.data.avatars[0].url);
        setIsLoading(false);
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

  const onClickSendHandler = (displayName, id) => {
    navigate("/create-order-request", {
      state: {
        displayName: displayName,
        id: id,
      },
    });
  };

  let show;
  if (!isLoading && portfolio) {
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
          <ProfileContainer>
            <div tw="w-[40px] h-[40px]">
              <CircleImage image={profileImg} />
            </div>
            {freelance.display_name}
          </ProfileContainer>
          <ButtonContainer>
            <Button
              width="60%"
              primary
              onClick={onClickSendHandler.bind(
                null,
                freelance.display_name,
                freelance.id
              )}
            >
              <div tw="font-bold text-base">ส่งออเดอร์</div>
            </Button>
            <Button width="30%" secondary onClick={() => {}}>
              <div tw="font-bold text-base">เเชท</div>
            </Button>
          </ButtonContainer>
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
