import tw from "twin.macro";
import { useState } from "react";
import CategoryButtonContainer from "./CategoryButtonContainer";
import LandingButton from "../shared/LandingButton";
import PortfolioCardContainer from "./PortfolioCardContainer";
import { useNavigate } from "react-router-dom";

const BG = tw.div`mx-auto w-[90%] max-w-[1200px] h-screen snap-center font-ibm pt-[5vh]`;
const Header = tw.div`text-2xl dt:text-3xl  text-freelance-black-primary font-bold`;

const Landing2 = () => {
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const handleClickSeeAll = () => {
    navigate("/search");
  };

  return (
    <BG>
      <div tw="flex flex-col justify-center items-center gap-y-[4vh] dt:gap-y-[2vh] h-full w-full">
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
