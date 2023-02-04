import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`items-center px-[18px] py-[31px] h-[360px] w-[270px] text-center`
        
    ],
    image:() => [
        tw`px-[44px]`
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
const ProfileCard = ({imgSrc, name, count=0, avgTime=0})=>(
    <Card hasShadow={true}>
        <div css={styles.content}>
            <img css={styles.image()} src={imgSrc}/>
            <div css={styles.name()}>{name}</div>
            <div css={styles.status()}>
                <div css={styles.left}>ขายงานแล้ว </div>
                <div css={styles.right}>{count} ครั้ง</div>
            </div>
            <div css={styles.status()}>
                <div css={styles.left}>เวลาตอบกลับ </div>
                <div css={styles.right}>{avgTime} นาที</div>
            </div>
        </div>
    </Card>
)

export default ProfileCard;