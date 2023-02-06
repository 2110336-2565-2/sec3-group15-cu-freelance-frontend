import tw from "twin.macro";
import Pencil from "../../assets/pencil.png"
const widthVariants = {
    category: tw`w-[30%]`,
    validate: tw`w-[30%]`,
    profile: tw`w-[30%]`,
    portfolio: tw`w-[30%]`,
    comment: tw`w-[30%]`
}
const styles = {
    container: ({hasShadow, type}) => [
        tw` border-[5px] border-[#D62B70] rounded-[40px] flex h-auto`,
        hasShadow && tw`shadow-[15px_15px_#E165AB]`,
        tw`items-center`,
        widthVariants[type]
    ],
    pencil: ({hasPencil}) => [
        tw`w-auto absolute top-0 right-0 -translate-y-10`,
        !hasPencil && tw`hidden`  
    ]
}
const Card = ({hasShadow=false, hasPencil=false, type, children}) => {
    console.log(type, widthVariants[type]);
    return (
        <div css={styles.container({hasShadow, type})}>        <img src={Pencil} css={styles.pencil({hasPencil})}></img>
            {children}
        </div>
    )
}
export default Card;