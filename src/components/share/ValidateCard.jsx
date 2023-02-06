import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`items-center px-[19px] py-[10px] h-[360px] w-[270px] text-center`
        
    ],
    image:() => [
        tw`pt-[10px] px-[44px]`
    ],
    text:()=>[
        tw`text-[20px] text-[#D62B70] font-medium px-[10px] m-[10px]`
    ]
}
const ValidateCard = ({imgSrc, text})=>(
    <Card hasShadow={false} type='validate'>
        <div css={styles.content}>
            <img css={styles.image()} src={imgSrc}/>
            <div css={styles.text()}>{text}</div>
        </div>
    </Card>
)
export default ValidateCard;