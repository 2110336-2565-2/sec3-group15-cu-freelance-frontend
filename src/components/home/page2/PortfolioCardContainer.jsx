import tw from "twin.macro";
import React, { useState, useEffect } from "react";
import { authClient } from "../../../utils/auth";
import PortFolioCard from "../../share/PortfolioCard";
import PortfolioImg from "../../../assets/PortfolioImage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import backButton from "../../../assets/NewHomePage/page2/backButton.svg";
import nextButton from "../../../assets/NewHomePage/page2/nextButton.svg";
import LoadingSpinner from "../../share/LoadingSpinner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./PortfolioCardContainer.css";
import { useNavigate } from "react-router-dom";

const Container = tw.div`flex mx-auto w-[90vw]`;

const PortfolioCardContainer = ({ select }) => {
  const [portfolios, setPortfolios] = useState(null);
  const navigate = useNavigate();
  const onClickDetailCard = (id) => {
    navigate(`/portfolio/${id}`);
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authClient.get(
          `/portfolio/search?limit=10&page=1&min_price=1&max_price=100000${
            select === 0 ? "" : `&category=${select}`
          }
          `
        );

        let ports = [];
        const data = [];
        let thumbnails;
        if (res.data.pagination.items != 0) {
          let portIds = "";
          ports = [...res.data.pagination.items];
          ports.some((port) => {
            portIds += `${port.id},`;
          });
          if (portIds.length > 0) {
            portIds = portIds.slice(0, portIds.length - 1);
          }

          const params = { id: portIds };
          const res_img = await authClient.get(
            `/file/portfolio/thumbnail?` +
              new URLSearchParams(params).toString()
          );

          thumbnails = [...res_img.data.thumbnails];
        }
        for (let i = 0; i < ports.length; i++) {
          data.push({ ...ports[i], url: thumbnails[i].url });
        }
        console.log(data);
        setPortfolios(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [select]);
  return (
    <>
      {!portfolios && (
        <div tw="w-screen h-[30px]">
          <LoadingSpinner />
        </div>
      )}
      {portfolios && (
        <Container tw="w-full">
          <img
            src={backButton}
            alt="backButton"
            className="prev-button"
            tw=" hidden tbl:inline w-[5%] min-w-[50px] cursor-pointer"
            // ref={navigationPrevRef}
          />
          <Swiper
            tw="py-5 px-0.5 w-full"
            loop={true}
            spaceBetween={15}
            // onReachEnd={(swiper) => {
            //   console.log(swiper);
            //   swiper.slideTo(0, 1000);
            // }}
            grabCursor={true}
            navigation={{
              prevEl: ".prev-button",
              nextEl: ".next-button",
            }}
            // autoplay={{ delay: 2000, disableOnInteraction: false }}
            slidesPerView="auto"
            modules={[Navigation, Autoplay]}
          >
            {portfolios.map((portfolio) => (
              <SwiperSlide key={portfolio.id} style={{ width: "270px" }}>
                <PortFolioCard
                  isLanding={true}
                  id={portfolio.id}
                  portImg={portfolio.url}
                  category={portfolio.category}
                  name={portfolio.name}
                  description={portfolio.description}
                  duration={portfolio.duration}
                  price={portfolio.price}
                  canEdit={false}
                  isPublic={portfolio.is_public}
                  onClick={onClickDetailCard.bind(null, portfolio.id)}
                  onClickPencil={() => {}}
                  setPortfolios={() => {}}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <img
            src={nextButton}
            alt="nextButton"
            className="next-button"
            tw="hidden tbl:inline w-[5%] min-w-[50px] cursor-pointer"
            // ref={navigationNextRef}
          />
        </Container>
      )}{" "}
    </>
  );
};

export default PortfolioCardContainer;
