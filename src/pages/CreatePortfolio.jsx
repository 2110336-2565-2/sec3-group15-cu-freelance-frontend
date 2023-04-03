import tw from "twin.macro";
import CreatePortfolioForm from "../components/Portfolio/CreatePortfolioForm";

const BG = tw.div`w-full pt-[10vh] min-h-[80vh] h-auto flex justify-center`;
const Container = tw.div`dt:shadow max-w-[600px] dt:rounded-[10px] w-full mb-3 h-auto`;

const CreatePortfolioPage = () => {
  return (
    <BG>
      <Container>
        <CreatePortfolioForm />
      </Container>
    </BG>
  );
};

export default CreatePortfolioPage;
