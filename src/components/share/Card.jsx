import tw from "twin.macro";
import Pencil from "../../assets/pencil.png";
const widthVariants = {
  category: tw`w-[30%] dt:w-[30%] dt:h-[100%]`,
  validate: tw`w-[30%] dt:w-[30%] dt:h-[100%] text-[#D62B70] font-ibm`,
  profile: tw`absolute left-[5%] w-[18vw] dt:w-[18vw] h-[40vh] font-ibm`,
  portfolio: tw`relative w-[30%] dt:w-[30%] dt:h-[35vh] text-[#D62B70] font-ibm`,
  comment: tw`w-[30%] dt:w-[30%] dt:h-[100%] text-[#D62B70]`,
  loginForm: tw`w-[45%]`,
};
const styles = {
  container: ({ hasShadow, type,borderDashed }) => [
    tw`border-[5px] border-[#D62B70] rounded-[40px] flex h-[80vh] justify-center items-center`,
    hasShadow && tw`shadow-[15px_15px_#E165AB]`,
    borderDashed&&tw`border-dashed`,
    tw`items-center`,
    widthVariants[type],
  ],
  pencil: ({ hasPencil }) => [
    tw`w-auto absolute top-0 right-0 translate-y-[-50%] translate-x-[30%]`,
    !hasPencil && tw`hidden`,
  ],
};
const Card = ({ hasShadow = false, hasPencil = false, type, children,borderDashed=false,onClick }) => {
  // console.log(type, widthVariants[type]);
  return (
    <div css={styles.container({ hasShadow, type,borderDashed })} onClick={onClick?onClick:()=>{}}>
      {" "}
      <img src={Pencil} css={styles.pencil({ hasPencil })}></img>
      {children}
    </div>
  );
};
export default Card;