import tw from "twin.macro";
import CreatedPortfolioForm from "../components/Portfolio/CreatedPortfolioForm";

const AddedPortfolioPage = () => {
  const BG = tw.div`h-[120vh] w-full pt-[15vh]`;
  const Card = tw.div`h-[80%] w-[70%] max-w-[450px] mx-auto text-[#D62B70] border-4 rounded-3xl border-[#D62B70] flex flex-col items-center pt-[2%]`;
  const Header = tw.div`text-[#D62B70] font-bold font-inter text-5xl`;

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
