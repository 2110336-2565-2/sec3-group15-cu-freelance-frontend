import tw, { styled } from "twin.macro";

const Button = (props) => {
  const { noBG,width } = props;

  const onClickHandler = () => {
    props.onClick();
  };
  const ButtonNoBG = tw.button`text-[#D62B70]  text-[20px]`;
  const ButtonBG = tw.button`text-white bg-[#D62B70] rounded-[4px] text-[20px]`;

  let Button;
  if (noBG) Button = ButtonNoBG;
  else Button = ButtonBG;

  const StyledButton = styled(Button)`
    width: ${width||"auto"};
    ${tw``}
  `;

  return <StyledButton>{props.children}</StyledButton>;
};

export default Button;