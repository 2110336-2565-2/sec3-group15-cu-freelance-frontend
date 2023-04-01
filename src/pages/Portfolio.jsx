import tw from "twin.macro";
import React from "react";
import PortfolioDetail from "../components/Portfolio/portfolioDetail/PortfolioDetail";

const Container = tw.div`h-auto min-h-[95vh] w-full pt-[10vh] flex flex-col items-center font-ibm`;

const PortfolioPage = () => {
  return (
    <Container>
      <PortfolioDetail />
    </Container>
  );
};
export default PortfolioPage;
