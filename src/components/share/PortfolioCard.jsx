import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`items-center py-[14px] h-[285px] w-[252px] text-center`
        
    ],
    profileBar:()=>[
        tw1`inline-flex`
    ],
    image:() => [
        tw`pl-[25px]`
    ],
    name:()=>[
        tw`text-[24px] text-[#D62B70] font-bold pt-[20px]`
    ],
    status:()=>[
        tw`w-full relative inline-flex font-semibold text-[#D62B70]`
    ],
    left:()=>[
        tw`absolute left-0 top-0`
    ],
    right:()=>[
        tw`absolute right-0 top-0`
    ]
}
const PortfolioCard = ({imgSrc, name, count=0, avgTime=0})=>(
    <Card hasShadow={false} hasPencil={true}>
        <div css={styles.content}>
            <div css={styles.profileBar}>
                <img css={styles.image} src={imgSrc}/>
                <div name={name}></div>
            </div>
        </div>
    </Card>
)

export default PortfolioCard;