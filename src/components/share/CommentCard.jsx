import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`flex flex-col w-[83.2%] h-[86.3%] items-center m-auto`
        
    ],
    comment:()=>[
        tw`text-left w-[100%] h-[45%] font-ibm text-xl`
    ],
    commentor:()=>[
        tw`flex flex-col items-center justify-end w-[100%] h-[55%]`
    ],
    image:() => [
        tw`w-[35%]`
    ],
    name:()=>[
        tw`text-[20px] text-[#D62B70] font-bold font-ibm`
    ],
    position:()=>[
        tw`font-inter`
    ]
}
const CommentCard = ({comment, imgSrc, name, position})=>(
    <Card hasShadow={false} type='comment'>
        <div css={styles.content}>
            <div css={styles.comment()}>{comment}</div>
            <div css={styles.commentor()}>
                <img css={styles.image()} src={imgSrc}/>
                <div css={styles.name()}>{name}</div>
                <div css={styles.position}>{position}</div>
            </div>
        </div>
    </Card>
)
export default CommentCard;