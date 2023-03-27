import tw, { styled } from "twin.macro";

const Button = (props) => {
  const { primary, secondary, width, disable, cancel, deleted, red } = props;
  let isDisable = false;

  if (disable) {
    isDisable = disable;
  }

  const onClickHandler = (e) => {
    e.stopPropagation();
    props.onClick();
  };

  const ButtonPrimary = tw.button`text-white bg-[#D62B70] rounded-lg text-mobile-body landing:text-mobile-h2 px-6 py-3 font-normal`;
  const ButtonRed = tw.button`text-white bg-[#EB4335] rounded-lg text-mobile-body landing:text-mobile-h2 px-6 py-3 font-normal`;
  const ButtonSecondary = tw.button`text-black  text-mobile-body landing:text-mobile-h2 text-center px-6 py-3 font-normal`;
  const ButtonCancel = tw.button`text-white bg-[#9E9E9E] rounded-lg text-xl p-3 font-normal`;
  const ButtonDelete = tw.button`text-white bg-[#D82929] rounded-lg text-xl p-3 font-normal disabled:bg-[#9E9E9E]`;

  let Button;
  if (primary) Button = ButtonPrimary;
  else if (red) Button = ButtonRed;
  else if (secondary) Button = ButtonSecondary;
  else if (cancel) Button = ButtonCancel;
  else if (deleted) Button = ButtonDelete;

  const StyledButton = styled(Button)`
    width: ${width || "auto"};
    ${tw`shadow-button rounded-lg font-ibm
    hover:shadow-buttonHover
    disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none`}
  `;

  return (
    <StyledButton onClick={onClickHandler} disabled={isDisable}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
