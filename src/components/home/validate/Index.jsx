import tw from "twin.macro";
import { dummy_validate } from "../../../store/home";
import ValidateCard from "../../share/ValidateCard";

const ValidateIndex = () => {
  const PageWrapper = tw.div`h-[95vh] w-[90%] max-w-[1200px] mx-auto bg-white pt-[15vh]`;
  const CardWrapper = tw.div`h-[60%] w-[100%]  max-w-[1100px] mt-[7%] mx-auto flex justify-between my-auto`;

  return (
    <PageWrapper>
      {" "}
      <CardWrapper>
        {dummy_validate.map((validate,idx) => (
          <ValidateCard key={idx} imgSrc={validate.img} text={validate.text} />
        ))}
      </CardWrapper>
    </PageWrapper>
  );
};

export default ValidateIndex;
