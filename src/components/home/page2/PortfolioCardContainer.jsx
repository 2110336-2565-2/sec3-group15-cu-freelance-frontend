import tw from "twin.macro";
import { useState, useEffect, useRef } from "react";
import { authClient } from "../../../utils/auth";
import PortFolioCard from "../../share/PortfolioCard";
import PortfolioImg from "../../../assets/PortfolioImage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import backButton from "../../../assets/NewHomePage/page2/backButton.svg";
import nextButton from "../../../assets/NewHomePage/page2/nextButton.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./PortfolioCardContainer.css";
import { useNavigate } from "react-router-dom";

const Container = tw.div`flex mx-auto w-[90vw]`;

const PortfolioCardContainer = ({ select }) => {
  const [portfolios, setPortfolios] = useState(null);
  // const navigationPrevRef = useRef(null);
  // const navigationNextRef = useRef(null);
  const navigate = useNavigate();
  const onClickDetailCard = (id) => {
    navigate(`/portfolio/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authClient.get(
          `/portfolio/search?limit=10&page=1&min_price=1&max_price=100000${
            select === 0 ? "" : `&category=${select}`
          }
          `
        );
        console.log(res);
        setPortfolios(res.data.pagination.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [select]);
  return (
    <Container tw="w-full">
      <img
        src={backButton}
        alt="backButton"
        className="prev-button"
        tw=" hidden tbl:inline w-[5%] min-w-[60px] cursor-pointer"
        // ref={navigationPrevRef}
      />
      <Swiper
        tw="py-5 px-0.5 w-full"
        // loop={true}
        grabCursor={true}
        navigation={{
          prevEl: ".prev-button",
          nextEl: ".next-button",
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        slidesPerView="auto"
        modules={[Navigation, Autoplay]}
      >
        {portfolios &&
          portfolios.map((portfolio) => (
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
      </Swiper>
      <img
        src={nextButton}
        alt="nextButton"
        className="next-button"
        tw="hidden tbl:inline  w-[5%] min-w-[60px] cursor-pointer"
        // ref={navigationNextRef}
      />
    </Container>
  );
};

export default PortfolioCardContainer;
