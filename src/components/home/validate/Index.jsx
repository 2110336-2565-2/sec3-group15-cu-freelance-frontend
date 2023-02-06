import tw from "twin.macro";
import { dummy_validate } from "../../../store/home";
import ValidateCard from "../../share/ValidateCard";

const ValidateIndex = () => {
  const PageWrapper = tw.div`h-[90vh] w-[90%] max-w-[1200px] mx-auto bg-white pt-[15vh]`;
  const CardWrapper = tw.div`h-[47%] w-[100%] mt-[10%] max-w-[1100px] mx-auto flex justify-between`;

  return (
    <PageWrapper>
      {" "}
      <CardWrapper>
        {dummy_validate.map((validate) => (
          <ValidateCard imgSrc={validate.img} text={validate.text} />
        ))}
      </CardWrapper>
    </PageWrapper>
  );
};

export default ValidateIndex;
