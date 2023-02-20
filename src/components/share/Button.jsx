import tw, { styled } from "twin.macro";

const Button = (props) => {
  const { primary, secondary, width, disable, cancel, deleted } = props;
  let isDisable = false;

  if (disable) {
    isDisable = disable;
  }

  const onClickHandler = () => {
    props.onClick();
  };

  const ButtonPrimary = tw.button`text-white bg-[#D62B70] rounded-lg text-xl px-6 py-3 font-normal`;
  const ButtonSecondary = tw.button`text-black  text-xl text-center px-6 py-3 font-normal`;
  const ButtonCancel = tw.button`text-white bg-[#9E9E9E] rounded-lg text-xl p-3 font-normal`;
  const ButtonDelete = tw.button`text-white bg-[#D82929] rounded-lg text-xl p-3 font-normal disabled:bg-[#9E9E9E]`;

  let Button;
  if (primary) Button = ButtonPrimary;
  else if (secondary) Button = ButtonSecondary;
  else if (cancel) Button = ButtonCancel;
  else if (deleted) Button = ButtonDelete;

  const StyledButton = styled(Button)`
    width: ${width || "auto"};
    ${tw`shadow-md rounded-[20px] font-ibm
    hover:shadow-lg
    disabled:cursor-not-allowed disabled:opacity-30`}
  `;

  return (
    <StyledButton onClick={onClickHandler} disabled={isDisable}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
