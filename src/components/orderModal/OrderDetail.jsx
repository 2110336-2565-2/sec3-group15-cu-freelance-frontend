import tw, { styled } from "twin.macro";
import React from "react";
import PencilIcon from "../../assets/Pencil.svg";
import DeleteIcon from "../../assets/DeleteProIcon.svg";
import MyOrderAvIcon from "../../assets/MyOrderAvIcon.svg";
import Button from "../share/Button";

const BG = tw.div`font-ibm flex flex-col gap-y-5 h-[82vh] max-h-[82vh] overflow-auto`;

const TitleLine = styled.div(({ between }) => [
  tw`flex items-center font-bold border-b-2 border-b-freelance-pink p-1 w-full`,
  between && tw`justify-between`,
]);

const Title = tw.div`text-[24px]`;
const ContainIcon = tw.div`flex  gap-x-2`;
const ImageIcon = tw.img`w-[30px]`;
const PriceLine = tw.div`font-bold text-[32px]`;
const DescriptionLine = tw.div`font-normal text-mobile-h2`;
const OrderInfo = tw.ul`list-disc list-inside`;
const Li = tw.li`list-item`;
const Time = tw.div`inline font-bold text-[24px]`;
const Line = tw.div`inline font-semibold text-[16px]`;
const PersonalInfo = tw.div`inline text-mobile-h2 font-semibold text-freelance-pink underline underline-offset-1`;
const FC = tw.div`flex text-mobile-body gap-x-2 items-center`;
const TypeFC = tw.div`font-normal`;
const NameFC = tw.div`font-bold`;
const ButtonLine = tw.div`flex justify-between`;

const OrderDetail = (props) => {
  let typeFC = props.userType === 2 ? "ฟรีเเลนซ์:" : "ผู้ว่าจ้าง:";
  return (
    <>
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
          <Li>
            {" "}
            <Time>
              {(props.orderType === "order" && `กำหนดส่ง ${3 / 10 / 22}`) ||
                `ระยะเวลา ${7} วัน`}
            </Time>
          </Li>
          <Li>
            <Line>
              <div tw="mr-2 inline">อีเมล</div>
              <PersonalInfo>{`nart@mail.com`}</PersonalInfo>
            </Line>
          </Li>
          <Li>
            <Line>
              <div tw="mr-2 inline">เบอร์โทรศัพท์</div>
              <PersonalInfo>{"0920297688"}</PersonalInfo>
            </Line>
          </Li>
        </OrderInfo>
        {props.orderType !== "template" && (
          <FC>
            <img src={MyOrderAvIcon} />
            <TypeFC>{typeFC}</TypeFC>
            <NameFC>{"Testkrub"}</NameFC>
          </FC>
        )}
      </BG>
      {props.userType === 1 && (
        <ButtonLine>
          <Button width="40%" secondary onClick={props.clickLeft}>
            {props.leftBtn}
          </Button>
          <Button width="40%" primary onClick={props.clickRight}>
            {props.rightBtn}
          </Button>
        </ButtonLine>
      )}
    </>
  );
};

export default OrderDetail;
