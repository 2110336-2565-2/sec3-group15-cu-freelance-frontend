import tw, { styled } from "twin.macro";
import PencilIcon from "../../assets/Pencil.svg";
import DeleteIcon from "../../assets/DeleteProIcon.svg";
import MyOrderAvIcon from "../../assets/MyOrderAvIcon.svg";

const BG = tw.div`font-ibm flex flex-col gap-y-5 max-h-[70vh] overflow-auto`;

const TitleLine = styled.div(({ between }) => [
  tw`flex items-center font-bold border-b-2 border-b-freelance-pink p-1 w-full`,
  between && tw`justify-between`,
]);

const Title = tw.div`text-[24px]`;
const ContainIcon = tw.div`flex  gap-x-2`;
const ImageIcon = tw.img`w-[30px]`;
const PriceLine = tw.div`font-bold text-[32px]`;
const DescriptionLine = tw.div`font-normal text-mobile-h2`;
const OrderInfo = tw.ul`list-disc`;
const Time = tw.li`flex font-bold text-[24px]`;
const Line = tw.li`flex gap-x-10 font-semibold text-[16px]`;
const PersonalInfo = tw.div`text-mobile-h2 font-semibold text-freelance-pink border-b border-b-freelance-pink`;
const FC = tw.div`flex text-mobile-body`;
const TypeFC = tw.div`font-normal`;
const NameFC = tw.div`font-bold`;

const OrderDetail = (props) => {
  let typeFC = userType === 2 ? "ฟรีเเรนซ์:" : "ผู้ว่าจ้าง";
  return (
    <BG>
      <TitleLine between={props.between}>
        <Title>test</Title>
        {props.between && (
          <ContainIcon>
            <ImageIcon src={PencilIcon} />
            <ImageIcon src={DeleteIcon} />
          </ContainIcon>
        )}
      </TitleLine>
      <PriceLine>{`฿ 2500`}</PriceLine>
      <DescriptionLine>{"hellotest"}</DescriptionLine>
      <OrderInfo>
        <Time>
          {(props.orderType === "order" && `กำหนดส่ง ${3 / 10 / 22}`) ||
            `ระยะเวลา ${7} วัน`}
        </Time>
        <Line>
          อีเมล
          <PersonalInfo>{`nart@mail.com`}</PersonalInfo>
        </Line>
        <Line>
          เบอร์โทรศัพท์
          <PersonalInfo>{"0920297688"}</PersonalInfo>
        </Line>
      </OrderInfo>
      {props.orderType !== "template" && (
        <FC>
          <img src={MyOrderAvIcon} />
          <TypeFC>{typeFC}</TypeFC>
          <NameFC>{"Testkrub"}</NameFC>
        </FC>
      )}
    </BG>
  );
};

export default OrderDetail;
