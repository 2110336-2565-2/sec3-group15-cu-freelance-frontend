import tw from "twin.macro";
import Card from "./Card";
const styles = {
  content: () => [
    tw`flex flex-col h-[100%] w-[100%] text-center items-center justify-center`,
  ],
  profileBar: () => [tw`flex flex-row h-[50px] items-center w-[80%]`],
  userImage: () => [tw`w-[17%] mr-[4px]`],
  name: () => [tw`text-[16px] text-[#D62B70] font-bold flex`],
  portImage: () => [tw`border-[#D62B70] box-border border-y-[5px] w-[100%]`],
  description: () => [tw`text-left w-[80%] h-[50px] mx-auto break-words`],
  close: () => [tw`bg-black absolute`],
};
const PortfolioCard = ({
  userImgSrc,
  portImgSrc,
  name,
  description,
  isClose = false,
  onClick,
  onPencilClick,
  hasPencil=true
}) => (
  <Card
    hasShadow={false}
    hasPencil={hasPencil}
    type="portfolio"
    close={isClose}
    onClick={onClick}
    onPencilClick={onPencilClick}
  >
    <div css={styles.content}>
      <div css={styles.profileBar}>
        <img css={styles.userImage} src={userImgSrc} />
        <div css={styles.name}>{name}</div>
      </div>
      <img css={styles.portImage} src={portImgSrc} />
      <div css={styles.description}>{description}</div>
    </div>
  </Card>
);

export default PortfolioCard;
