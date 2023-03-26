import tw from "twin.macro";

const BG = tw.div`h-screen snap-center font-ibm pt-[15vh] flex flex-col items-center`;
const Header = tw.div`text-4xl text-freelance-landing-purple font-bold`;

const Landing2 = () => {
  return (
    <BG>
      <Header>หมวดหมู่ยอดนิยม</Header>
    </BG>
  );
};

export default Landing2;
