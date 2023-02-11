import tw from "twin.macro";
import CreatedPortfolioForm from "../components/Portfolio/CreatedPortfolioForm";

const AddedPortfolioPage = () => {
  const BG = tw.div`h-auto min-h-[95vh] w-full pt-[15vh] mb-[2vh]`;
  const Card = tw.div`h-[auto] min-h-[95vh] w-[70%] max-w-[450px] mx-auto text-[#D62B70] border-4 rounded-3xl border-[#D62B70] flex flex-col items-center`;
  const Header = tw.div`text-[#D62B70] font-bold font-inter text-5xl mt-6`;

  return (
    <BG>
      <Card>
        <Header>Create Portfolio</Header>
        <CreatedPortfolioForm/>
      </Card>
    </BG>
  );
};

export default AddedPortfolioPage;
