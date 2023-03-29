import tw from "twin.macro";
import CreatePortfolioForm from "../components/Portfolio/CreatePortfolioForm";

const BG = tw.div`w-full pt-[10vh] min-h-[95vh] h-auto`;

const CreatePortfolioPage = () => {
  return (
    <BG>
      <CreatePortfolioForm />
    </BG>
  );
};

export default CreatePortfolioPage;
