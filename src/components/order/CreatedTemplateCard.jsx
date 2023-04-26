import tw from "twin.macro";

const Card = styled.div(({ focus }) => [
  tw`flex flex-col  h-fit rounded-[20px] min-w-[245px] w-[30%]  shadow relative cursor-pointer p-5 gap-y-3`,
  focus && tw`outline outline-2 outline-freelance-pink`,
]);

const CreatedTemplateCard = () => {
  return <Card></Card>;
};

export default CreatedTemplateCard;
