import tw from "twin.macro";
const styles = {
  container: ({ active, small }) => [
    tw`aspect-square w-[36px] h-[36px] rounded-full text-[#D62B70] border-[2px] border-[#D62B70]`,
    active && tw`bg-[#D62B70] text-white`,
    small && tw`aspect-square w-[16px] h-[16px] cursor-default`,
  ],
};
const StateButton = ({
  num,
  active = false,
  small = false,
  onClick,
  progress,
  formValid,
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
  return (
    <button
      css={styles.container({ active, small })}
      onClick={onClickHandler}
      disabled={disableButton | checkValid}
    >
      {num}
    </button>
  );
};
export default StateButton;
