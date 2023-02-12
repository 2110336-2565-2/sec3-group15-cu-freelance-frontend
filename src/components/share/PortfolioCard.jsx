import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`flex flex-col h-[95%] w-[100%] text-center items-center justify-center`,
    ],
    profileBar:()=>[
        tw`flex flex-row h-[20%] items-center w-[90%]`
    ],
    userImage:() => [
        tw`w-[17%] mr-[4px]` 
    ],
    name:()=>[
        tw`text-[16px] text-[#D62B70] font-bold flex`
    ],
    portImage:()=>[
        tw`border-[#D62B70] box-border border-y-[5px] w-[100%]`
    ],
    description:()=>[
        tw`text-left w-[80%]`
    ],
    close:()=>[
        tw`bg-black absolute`
    ]
}
const PortfolioCard = ({userImgSrc, portImgSrc, name, description, isClose=false})=>(
    <Card hasShadow={false} hasPencil={true} type='portfolio' close={isClose}>
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