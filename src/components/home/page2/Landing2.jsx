import tw from "twin.macro";
import { useState } from "react";
import CategoryButtonContainer from "./CategoryButtonContainer";
import LandingButton from "../shared/LandingButton";
import PortfolioCardContainer from "./PortfolioCardContainer";
import { useNavigate } from "react-router-dom";

const BG = tw.div`mx-auto w-[90%] h-screen snap-center font-ibm`;
const Header = tw.div`text-4xl text-freelance-landing-purple font-bold`;

const Landing2 = () => {
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const handleClickSeeAll = () => {
    navigate("/search");
  };

  return (
    <BG>
      <div tw="flex flex-col justify-center items-center gap-y-[7vh] h-full">
        <Header>หมวดหมู่ยอดนิยม</Header>
        <CategoryButtonContainer select={select} setSelect={setSelect} />
        <PortfolioCardContainer select={select} />
        <LandingButton type={"onlyborder"} onClick={handleClickSeeAll}>
          ดูงานทั้งหมด
        </LandingButton>
      </div>
    </BG>
  );
};

export default Landing2;
