import tw from "twin.macro";
import Card from "./Card";
const styles = {
  content: () => [
    tw`h-[94.7%] w-[87.6%] text-center flex flex-col justify-center items-center `,
  ],
  imageWrapper:()=>[tw`w-[60%] h-[65%] flex justify-center `],
  titleWrapper:()=>[tw`w-[100%] h-[35%] flex justify-center mt-[2%]`],
  image: () => [tw`object-contain`],
  title: () => [tw`w-[100%] text-center text-4xl text-[#D62B70] font-bold`],
};
const CategoryCard = ({ imgSrc, title }) => (
  <Card hasShadow={true} type="category">
    <div css={styles.content}>
      <div css={styles.imageWrapper}>
        <img css={styles.image()} src={imgSrc} />
      </div>
      <div css={styles.titleWrapper}>
        {" "}
        <div css={styles.title()}>{title}</div>
      </div>
    </div>
  </Card>
);
export default CategoryCard;
