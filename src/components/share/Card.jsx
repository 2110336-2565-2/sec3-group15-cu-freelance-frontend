import tw from "twin.macro";
import Pencil from "../../assets/pencil.png";
const widthVariants = {
  category: tw`w-[30%] dt:w-[30%] dt:h-[100%]`,
  validate: tw`w-[30%] dt:w-[30%] dt:h-[100%] text-[#D62B70] font-ibm`,
  profile: tw`fixed pf:left-[13vw] left-[5%] w-[18vw] dt:w-[18vw] dt:min-w-[206px] h-[40vh] font-ibm max-w-[270px]`,
  portfolio: tw`relative w-[30%] dt:w-[30%] dt:min-w-[220px] dt:h-[33vh] dt:min-h-[300px] text-[#D62B70] font-ibm cursor-pointer`,
  comment: tw`w-[30%] dt:w-[30%] dt:h-[100%] text-[#D62B70]`,
  loginForm: tw`w-[45%]`,
  loginType: tw`w-[42%] box-border h-[100%] box-border cursor-pointer`,
  registerSuccess: tw`w-[38%] h-fit`
};
const styles = {
  container: ({ hasShadow, type,borderDashed }) => [
    tw`border-[5px] border-[#D62B70] rounded-[40px] flex h-[80vh] justify-center items-center`,
    hasShadow && tw`shadow-[15px_15px_#E165AB]`,
    borderDashed&&tw`border-dashed`,
    tw`items-center`,
    widthVariants[type],
  ],
  pencil: () => [
    tw`w-auto absolute top-0 right-0 translate-y-[-50%] translate-x-[30%] z-10  hover:ring-2`,
  ],
};
const Card = ({ hasShadow = false, hasPencil = false, type, children,borderDashed=false,onClick }) => {
  // console.log(type, widthVariants[type]);
  return (
    <div css={styles.container({ hasShadow, type,borderDashed })} onClick={onClick?onClick:()=>{}}>
      {" "}
      {hasPencil&&<img src={Pencil} css={styles.pencil()}/>}
      {children}
    </div>
  );
};
export default Card;