import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import tw from "twin.macro";
import "./ImageCarousel.css";
const ImageCarousel = ({ images }) => {
  return (
    <Swiper
      tw="w-full mb-5"
      pagination={true}
      modules={[Pagination]}
      loop={true}
      grabCursor={true}
      //   autoplay={{ delay: 2000, disableOnInteraction: false }}
      slidesPerView={1}
      //   modules={[Navigation, Autoplay]}
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx} style={{ width: "100vw", height: "100%" }}>
          <div tw="flex w-full justify-center items-center h-full">
            <img src={image} tw="object-scale-down" alt="img" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
