import tw from "twin.macro";
import Pencil from "../../assets/pencil.svg";
import CloseEyeIcon from "../../assets/CloseEyeIcon.svg";
const widthVariants = {
  category: tw`w-[30%] dt:w-[30%] dt:h-[100%]`,
  validate: tw`w-[30%] dt:w-[30%] dt:h-[100%] text-[#D62B70] font-ibm`,
  profile: tw`sticky top-[12vh] w-[18vw] dt:w-[18vw] dt:min-w-[206px] dt:min-h-[350px] h-[40vh] font-ibm max-w-[270px]`,
  portfolio: tw`relative w-[30%] dt:w-[30%] dt:min-w-[220px] dt:max-w-[225px] dt:h-[20vh] dt:min-h-[270px] dt:max-h-[300px] text-[#D62B70] font-ibm cursor-pointer`,
  comment: tw`w-[30%] dt:w-[30%] dt:h-[100%] text-[#D62B70]`,
  loginForm: tw`w-[45%]`,
  loginType: tw`w-[42%] box-border h-[100%]  cursor-pointer border border-black text-black hover:border-[#D62B70] hover:text-[#D62B70]`,
  registerSuccess: tw`w-[38%] h-fit box-border my-4 border-0`,
  portfolio2: tw`w-fit h-fit p-4 self-center`,
  order:tw`w-fit h-fit flex flex-col`
};
const styles = {
  container: ({ hasShadow, type, borderDashed }) => [
    tw`font-ibm border-[2px] border-gray-300 rounded-2xl flex h-[80vh] justify-center items-center `,
    hasShadow && tw`shadow-[100px_15px_15px_#E165AB]`,
    borderDashed && tw`border-dashed`,
    tw`items-center`,
    widthVariants[type],
  ],
  pencil: () => [
    tw`w-auto absolute top-0 right-0 translate-y-[-50%] translate-x-[30%] z-20 hover:ring-2 `,
  ],
  sepia: () => [tw`absolute w-full h-full bg-black opacity-10 rounded-[35px]`],
  image: () => [tw`absolute w-auto`],
};
const Card = ({
  hasShadow = false,
  hasPencil = false,
  type,
  children,
  borderDashed = false,
  onClick,
  close = false,
  onPencilClick = () => {},
}) => {
  return (
    <div
      css={styles.container({ hasShadow, type, borderDashed })}
      onClick={onClick ? onClick : () => {}}
    >
      {" "}
      {hasPencil && (
        <img src={Pencil} css={styles.pencil()} onClick={onPencilClick} />
      )}
      {children}
      {close && <img src={CloseEyeIcon} css={styles.image()} />}
      {close && <div css={styles.sepia()}></div>}
    </div>
  );
};
export default Card;
