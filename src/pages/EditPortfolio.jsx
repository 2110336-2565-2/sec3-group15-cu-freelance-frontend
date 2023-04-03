import tw from "twin.macro";
import EditPortfolioForm from "../components/Portfolio/EditPortfolioForm";

const EditPortfolioPage = () => {
  const BG = tw.div`w-full flex justify-center pt-[10vh] `;
  const Container = tw.div`min-h-[80vh] w-[100%] max-w-[600px] mx-auto my-2.5 dt:shadow  mb-3 dt:rounded-[10px] dt:py-3`;

  return (
    <BG>
      <Container>
        <EditPortfolioForm />
      </Container>
    </BG>
  );
};
export default EditPortfolioPage;
