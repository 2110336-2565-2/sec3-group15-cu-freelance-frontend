import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import Card from "./Card";
const styles = {
  content: () => [tw`flex flex-col h-[100%] w-[100%] text-center`],
  profileBar: () => [
    tw`flex flex-row h-[41px] pl-[25px] my-[14px] items-center`,
  ],
  userImage: () => [tw`h-[100%] mr-[4px]`],
  name: () => [tw`text-[16px] text-[#D62B70] font-bold flex`],
  portImage: () => [tw`border-[#D62B70] box-border border-y-[5px] w-[100%]`],
  description: () => [tw`flex my-[14px] ml-[25px] mr-[16px] text-left`],
};
const AddPortfolioCard = ({ onClick }) => {
  console.log(onClick);
  return (
    <Card borderDashed={true} type="portfolio" onClick={onClick}>
      <div css={styles.content}></div>
    </Card>
  );
};

export default AddPortfolioCard;
