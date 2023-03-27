import { Swiper, SwiperSlide } from "swiper/react";
import PortFolioCard from "../share/PortfolioCard";
import PortfolioImg from "../../assets/PortfolioImage.svg";
import { useNavigate } from "react-router";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import LoadingSpinner from "../share/LoadingSpinner";

const SearchCorousel = ({ portfolios, isLoading, handleInfiniteScroll }) => {
  const navigate = useNavigate();
  const onClickDetailCard = (id) => {
    navigate(`/portfolio/${id}`);
  };

  return (
    <>
      {portfolios && (
        <Swiper
          tw="py-5 px-0.5 w-full"
          onReachEnd={(swiper) => {
            console.log(swiper);
            handleInfiniteScroll();
          }}
          grabCursor={true}
          slidesPerView="auto"
        >
          {portfolios.map((portfolio) => (
            <SwiperSlide key={portfolio.id} style={{ maxWidth: "260px" }}>
              <PortFolioCard
                id={portfolio.id}
                portImg={PortfolioImg}
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
          {isLoading && <LoadingSpinner />}
        </Swiper>
      )}{" "}
    </>
  );
};

export default SearchCorousel;
