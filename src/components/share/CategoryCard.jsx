import tw from "twin.macro"
import Card from "./Card";
const styles = {
    content:() => [
        tw`items-center mx-[19px] my-[10px] h-[360px] w-[270px] text-center flex flex-col`
        
    ],
    image:() => [
        tw`mt-[10px] w-[182px] h-[182px]`
    ],
    title:()=>[
        tw`text-[40px] text-[#D62B70] font-bold mt-[20px]`
    ]
}
const CategoryCard = ({imgSrc, title})=>(
    <Card hasShadow={true}>
        <div css={styles.content}>
            <img css={styles.image()} src={imgSrc}/>
            <div css={styles.title()}>{title}</div>
        </div>
    </Card>
)
export default CategoryCard;