import tw from "twin.macro";
import Pencil from "../../assets/pencil.png"
const styles = {
    container: ({hasShadow, width}) => [
        tw`w-fit border-[5px] border-[#D62B70] rounded-[40px]`,
        hasShadow && tw`shadow-[15px_15px_#E165AB]`,
        tw`items-center`
        // tw`w-[${width}rem]`
    ],
    pencil: ({hasPencil}) => [
        tw`w-auto absolute top-0 right-0 -translate-y-10`,
        !hasPencil && tw`hidden`  
    ]
}
const Card = ({hasShadow=false, hasPencil=false, sm, md, lg, children}) => (
    <div css={styles.container({hasShadow, sm, md, lg})}>
        <img src={Pencil} css={styles.pencil({hasPencil})}></img>
        {children}
    </div>
)
export default Card;