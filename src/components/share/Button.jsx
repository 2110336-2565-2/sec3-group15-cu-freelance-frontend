import tw from "twin.macro";

const Button = (props) => {
  const { noBG,tw } = props;
  console.log(tw);
  const onClickHandler = () => {
    props.onClick();
  };
  const ButtonNoBG = tw.button`text-[#D62B70] `;
  const ButtonBG = tw.button`text-white bg-[#D62B70] rounded-[4px]`;
  let button;
  if (noBG)
    button = <ButtonNoBG tw={tw} onClick={onClickHandler}>{props.children}</ButtonNoBG>;
  else button = <ButtonBG tw={tw}>{props.children}</ButtonBG>;
  return button;
};

export default Button;
