import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`h-[94.7%] w-[87.6%] text-center flex flex-col justify-center`
        
    ],
    image:() => [
        tw`w-[182px] h-[182px]`
    ],
    title:()=>[
        tw`text-[40px] text-[#D62B70] font-bold mt-[20px]`
    ]
}
const CategoryCard = ({imgSrc, title})=>(
    <Card hasShadow={true} type='category'>
        <div css={styles.content}>
            <img css={styles.image()} src={imgSrc}/>
            <div css={styles.title()}>{title}</div>
        </div>
    </Card>
)
export default CategoryCard;