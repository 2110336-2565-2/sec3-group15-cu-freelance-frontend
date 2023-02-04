import tw from "twin.macro";

const HeroIndex = () => {
  const PageWrapper = tw.div`w-screen h-[90vh] mt-[10vh] py-[5vh]`;
  const BG = tw.div`w-[1500px] h-[80vh] bg-[#D62B70] mx-auto rounded-lg`;
  return (
    <PageWrapper>
        <BG>hello</BG>
    </PageWrapper>
  );
};

export default HeroIndex;
