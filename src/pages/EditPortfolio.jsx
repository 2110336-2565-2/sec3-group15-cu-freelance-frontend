import tw from "twin.macro";
import EditPortfolioForm from "../components/Portfolio/EditPortfolioForm";

const EditPortfolioPage = () => {
  const Container = tw.div` pt-[10vh] min-h-[80vh] w-[100%] max-w-[1200px] mx-auto my-2.5`;

  return (
    <Container>
      <EditPortfolioForm />
    </Container>
  );
};
export default EditPortfolioPage;
