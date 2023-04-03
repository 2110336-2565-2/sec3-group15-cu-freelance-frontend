import tw from "twin.macro";
import { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper";
import PortFolioCard from "../share/PortfolioCard";
import PortfolioImg from "../../assets/PortfolioImage.svg";
import { useNavigate } from "react-router";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/bundle";

const SearchCorousel = forwardRef(
  (
    {
      portfolios,
      isLoading,
      handleInfiniteScroll,
      canEdit = false,
      setPortfolios = () => {},
      handleClickDetailCard,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const onClickDetailCard = (id) => {
      navigate(`/portfolio/${id}`);
    };
    const onClickEditCard = (id, e) => {
      e.stopPropagation();
      navigate(`/portfolio/${id}/edit`);
    };

    return (
      <div tw="flex justify-center w-full pl-2 dt:pl-0">
        {!portfolios && !isLoading && <div>no result </div>}
        {portfolios && (
          <Swiper
            spaceBetween={25}
            ref={ref}
            tw="py-5 px-0.5 w-full"
            // onReachEnd={(swiper) => {
            //   console.log(swiper);
            //
            // }}
            onSlideChange={(swiper) => {
              if (swiper.activeIndex === portfolios.length - 5) {
                handleInfiniteScroll();
              }
            }}
            grabCursor={true}
            slidesPerView="auto"
            mousewheel
            modules={[Mousewheel]}
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
                  canEdit={canEdit}
                  isPublic={portfolio.is_public}
                  onClick={
                    handleClickDetailCard
                      ? handleClickDetailCard.bind(null, portfolio.id)
                      : onClickDetailCard.bind(null, portfolio.id)
                  }
                  onClickPencil={onClickEditCard.bind(null, portfolio.id)}
                  setPortfolios={setPortfolios}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* {isLoading && (
          <div tw="w-[280px]">
            <LoadingSpinner />
          </div>
        )} */}
      </div>
    );
  }
);

export default SearchCorousel;
