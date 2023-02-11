import tw from "twin.macro";

const AddedPortfolioPage = () => {
  const BG = tw.div`h-[100vh] w-full pt-[15vh]`;
  const Card = tw.div`h-[80%] w-[70%] max-w-[650px] mx-auto text-[#D62B70] border-2 rounded-md border-[#D62B70] flex flex-col items-center`;
  const Header = tw.div`text-[#D62B70] font-bold text-5xl`;

  return (
    <BG>
      <Card>
        <Header>Create Portfolio</Header>
      </Card>
    </BG>
  );
};

export default AddedPortfolioPage;
