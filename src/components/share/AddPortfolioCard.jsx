import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import Card from "./Card";
import PlusIcon from '../../assets/PlusIcon.svg'
const styles = {
  content: () => [tw`flex flex-col h-[100%] w-[100%] flex flex-col justify-center items-center`],
  plusImage: () => [tw`w-[60%]`],
  addText:()=>[
    tw``
]
};
const AddPortfolioCard = ({ onClick }) => {
  console.log(onClick);
  return (
    <Card borderDashed={true} type="portfolio" onClick={onClick}>
      <div css={styles.content}>
        <img src={PlusIcon} css={styles.plusImage}></img>
        <div css={styles.addText}>เพิ่ม Portfolio ใหม่</div>
      </div>
    </Card>
  );
};

export default AddPortfolioCard;
