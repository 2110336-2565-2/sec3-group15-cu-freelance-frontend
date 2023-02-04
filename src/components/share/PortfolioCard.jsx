import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`flex flex-col h-[313px] w-[252px] text-center`
    ],
    profileBar:()=>[
        tw`flex flex-row h-[41px] pl-[25px] my-[14px] items-center`
    ],
    userImage:() => [
        tw`h-[100%] mr-[4px]` 
    ],
    name:()=>[
        tw`text-[16px] text-[#D62B70] font-bold flex`
    ],
    portImage:()=>[
        tw`border-[#D62B70] box-border border-y-[5px]`
    ],
    description:()=>[
        tw`flex my-[14px] ml-[25px] mr-[16px] text-left`
    ]
}
const PortfolioCard = ({userImgSrc, portImgSrc, name, description})=>(
    <Card hasShadow={false} hasPencil={true}>
        <div css={styles.content}>
            <div css={styles.profileBar}>
                <img css={styles.userImage} src={userImgSrc}/>
                <div css={styles.name}>{name}</div>
            </div>
            <img css={styles.portImage}src={portImgSrc}/>
            <div css={styles.description}>{description}</div>
        </div>
    </Card>
)

export default PortfolioCard;