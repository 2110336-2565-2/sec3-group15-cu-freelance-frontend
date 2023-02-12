import tw, { styled } from "twin.macro";

const Button = (props) => {
  const { noBG, width, disable } = props;
  let isDisable = false;

  if (disable) {
    isDisable = disable;
  }

  const onClickHandler = () => {
    props.onClick();
  };
  const ButtonNoBG = tw.button`text-[#D62B70]  text-xl text-center p-3`;
  const ButtonBG = tw.button`text-white bg-[#D62B70] rounded-lg text-xl p-3 font-bold`;

  let Button;
  if (noBG) Button = ButtonNoBG;
  else Button = ButtonBG;

  const StyledButton = styled(Button)`
    width: ${width || "auto"};
    ${tw`disabled:cursor-not-allowed 
    disabled:opacity-30
    disabled:cursor-not-allowed`}
  `;

  return (
    <StyledButton onClick={onClickHandler} disabled={isDisable}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
