import tw from "twin.macro";
import { categoriesButton } from "../../store/search-store";
import CategoryButtonMB from "./CategoryButtonMB";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Container = tw.div`w-full h-fit pl-2 dt:pl-0 z-30`;

const CategoryButtonContainer = ({ setSelectedCategory, select }) => {
  return (
    <Container>
      {" "}
      <Swiper
        // ref={ref}
        spaceBetween={10}
        tw="px-0.5 w-full"
        // onReachEnd={(swiper) => {
        //   console.log(swiper);
        //
        // }}
        // onSlideChange={(swiper) => {
        //   if (swiper.activeIndex === portfolios.length - 5) {
        //     handleInfiniteScroll();
        //   }
        // }}
        grabCursor={true}
        slidesPerView="auto"
      >
        {categoriesButton.map((category, idx) => (
          <SwiperSlide key={idx} style={{ width: "max-content" }}>
            <CategoryButtonMB
              text={category.text}
              setSelect={setSelectedCategory}
              value={category.value}
              imgPink={category.imgPink}
              imgWhite={category.imgWhite}
              isSelect={select === category.value}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default CategoryButtonContainer;
