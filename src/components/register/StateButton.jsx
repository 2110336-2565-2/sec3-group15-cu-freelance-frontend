import tw, {styled} from "twin.macro";
const styles = {
  container: ({ active, small }) => [
    tw`aspect-square w-[36px] h-[36px] rounded-full border-[2px] border-[#DBDBDB] text-[#DBDBDB] font-bold font-sans`,
    active && tw`text-freelance-black-primary`,
    small && tw`aspect-square w-[16px] h-[16px] cursor-default`,
  ],
};
const Step = styled.div(({active, small})=>[
  tw`font-ibm text-mobile-small dt:text-base font-semibold text-[#DBDBDB]`,
  active && tw`text-freelance-black-primary`,
  ]
);
const Container = tw.div`flex flex-col items-center`;
const StateButton = ({
  num,
  active = false,
  small = false,
  onClick,
  progress,
  formValid,
  text
}) => {
  let disableButton = false;
  let checkValid = false;
  if (!small) {
    disableButton = !active & (progress < num);
    checkValid =
      ((num === 2) & !formValid.form1) |
      ((num === 3) & !(formValid.form1 & formValid.form2));
  }
  const onClickHandler = () => {
    onClick(num);
  };
  console.log(num,active)
  return (
    <Container>
    <button
      css={styles.container({ active, small })}
      onClick={onClickHandler}
      disabled={disableButton | checkValid}
    >
      {num}
    </button>
    <Step active={active} small={small}>{text}</Step>
    </Container>
  );
};
export default StateButton;
