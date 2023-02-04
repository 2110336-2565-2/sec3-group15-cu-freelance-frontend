import tw from "twin.macro";

const HeroIndex = () => {
  const PageWrapper = tw.div`w-[screen] h-[screen]`;
  const ContentWrapper = tw.div`h-[90%] w-[1500px] mx-auto`;
  const BG = tw.div`w-[100%] m-auto `;
  return (
    <PageWrapper>
      <ContentWrapper>
        <BG>hello</BG>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default HeroIndex;
