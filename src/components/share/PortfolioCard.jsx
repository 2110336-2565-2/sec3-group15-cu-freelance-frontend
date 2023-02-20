import tw from "twin.macro"
import durationIcon from "../../assets/DurationIcon.svg"
import pencil from "../../assets/pencil.svg"
const PortFolioCard = ({portImg, category, name, description, duration, price, haspencil=false, onClick,onClickPencil}) => {
  const Container = tw.div`flex flex-col h-fit rounded-[20px] max-w-[25vh] shadow-xl relative cursor-pointer`
  const Img = tw.img``;
  const ContentContainer = tw.div`flex flex-col px-4 border-b-2 border-[#B7B7B7] text-left`
  const Category = tw.div`mt-4 mb-2 text-[#D62B70] text-sm font-medium`;
  const Name = tw.div`font-bold text-3xl`;
  const Description = tw.p`my-2 leading-[1.2em] h-[3.5em] overflow-hidden text-sm mb-4 font-ibm`;
  const FooterContainer = tw.div`flex flex-row justify-between p-2 items-center`;
  const Duration = tw.div`flex flex-row items-center gap-x-2 text-[#707070]`;
  const DurationIcon = tw.img`max-w-[1rem]`;
  const Price = tw.div`text-[#151515] font-semibold`;
  const Pencil = tw.img`w-auto absolute top-0 right-0 translate-y-[-50%] translate-x-[30%] z-20 hover:ring-2 `;
  return (
    <Container onClick={onClick ? onClick : () => {}}>
      {haspencil && <Pencil src={pencil} onClick={onClickPencil}/>}
      <Img src={portImg}/>
      <ContentContainer>
        <Category>{category}</Category>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </ContentContainer>
      <FooterContainer>
        <Duration>
          <DurationIcon src={durationIcon}></DurationIcon>
          <div tw="font-ibm">{duration} วัน</div>
        </Duration>
        <Price>{price}.-</Price>
      </FooterContainer>
    </Container>
  )
}
export default PortFolioCard