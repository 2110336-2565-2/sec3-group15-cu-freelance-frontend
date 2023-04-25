import tw, { styled } from "twin.macro";
import CheckIcon from "../../assets/CheckIconFull.svg";
const Container = styled.div(({}) => [
  tw`flex flex-col m-auto justify-between gap-y-8`,
]);
const IconSection = styled.div(({}) => [tw`flex flex-col items-center`]);
const Icon = styled.img(({}) => [tw`w-8 h-8`]);
const IconDesc = styled.div(({}) => [
  tw`font-ibm font-bold text-mobile-small tbl:text-base`,
]);
const Title = styled.div(({}) => [
  tw`font-bold font-ibm text-freelance-black-primary text-mobile-h1 tbl:text-2xl text-center`,
]);
const Desc = styled.div(({}) => [
  tw`font-normal font-ibm text-freelance-black-secondary text-mobile-body  tbl:text-xl text-center`,
]);
const RequestDescription = ({
  icon = CheckIcon,
  iconDesc = "สำเร็จ",
  title,
  desc,
  hasIconDesc = true,
}) => {
  return (
    <Container>
      <IconSection>
        <Icon src={icon} />
        {hasIconDesc && <IconDesc>{iconDesc}</IconDesc>}
      </IconSection>
      <div tw="flex flex-col gap-4">
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      </div>
    </Container>
  );
};
export default RequestDescription;
