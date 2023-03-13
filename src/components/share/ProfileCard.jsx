import tw from "twin.macro"
import Card from "./Card";
import Button from "./Button";
const styles = {
    content:() => [
        tw`m-2 p-2 items-center justify-between h-[95%] w-[95%] flex flex-col`
    ],
    image:() => [
        tw`w-[40%]`
    ],
    name:()=>[
        tw`text-2xl font-bold`
    ],
    status:()=>[
        tw`w-[100%] h-[5%] relative font-semibold `
    ],
    left:()=>[
        tw`absolute left-0 top-0`
    ],
    right:()=>[
        tw`absolute right-0 top-0`
    ]
}
const ProfileCard = ({imgSrc, name, count=0, avgTime=0})=>(
    <Card hasShadow={false} type="profile">
        <div css={styles.content}>
            <img css={styles.image()} src={imgSrc}/>
            <div css={styles.name()}>{name}</div>
            <div css={styles.status()}>
                <div css={styles.left}>ขายงานแล้ว </div>
                <div css={styles.right}>{count} ครั้ง</div>
            </div>
            <div css={styles.status()}>
                <div css={styles.left}>เวลาตอบกลับเฉลี่ย </div>
                <div css={styles.right}>{avgTime} นาที</div>
            </div>
            <Button primary width="100%" disable={true} onClick={()=>{console.log("test")}}>แชทกับฟรีแลนซ์</Button>
        </div>
    </Card>
)

export default ProfileCard;