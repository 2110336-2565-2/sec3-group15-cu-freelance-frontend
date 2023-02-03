import tw from "twin.macro";

const Button = (props) => {
  const { noBG } = props;
  const onClickHandler = () => {
    props.onClick();
  };
  const ButtonNoBG = tw.button`text-[#D62B70] `;
  const ButtonBG = tw.button`text-white bg-[#D62B70] rounded-[4px]`;
  let button;
  if (noBG)
    button = <ButtonNoBG onClick={onClickHandler}>{props.children}</ButtonNoBG>;
  else button = <ButtonBG>{props.children}</ButtonBG>;
  return button;
};

export default Button;
