import tw, { styled } from "twin.macro";

const Button = (props) => {
  const { noBG } = props;

  const onClickHandler = () => {
    props.onClick();
  };
  const ButtonNoBG = tw.button`text-[#D62B70] `;
  const ButtonBG = tw.button`text-white bg-[#D62B70] rounded-[4px]`;

  let Button;
  if (noBG) Button = ButtonNoBG;
  else Button = ButtonBG;

  const StyledButton = styled(Button)`
    width: ${width};
    ${tw``}
  `;

  return <StyledButton>{props.children}</StyledButton>;
};

export default Button;
