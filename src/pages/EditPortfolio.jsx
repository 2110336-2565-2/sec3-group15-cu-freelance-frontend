import tw from "twin.macro";
import EditPortfolioForm from "../components/Portfolio/EditPortfolioForm";

const EditPortfolioPage = () => {
  const Container = tw.div` pt-[15vh] min-h-[95vh] w-[100vw] max-w-[1200px] mx-auto my-2.5`;
 
  return (
    <Container>
      <EditPortfolioForm/>
    </Container>
  );
};
export default EditPortfolioPage;
