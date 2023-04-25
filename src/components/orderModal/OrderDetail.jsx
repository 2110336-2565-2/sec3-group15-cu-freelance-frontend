import tw, { styled } from "twin.macro";
import React from "react";
import PencilIcon from "../../assets/Pencil.svg";
import DeleteIcon from "../../assets/DeleteProIcon.svg";
import MyOrderAvIcon from "../../assets/MyOrderAvIcon.svg";
import Button from "../share/Button";
import StatusBar from "../orderCard/StatusBar";

const BG = tw.div`font-ibm flex flex-col gap-y-5 h-[82vh] dt:h-[80%] max-h-[82vh] overflow-auto`;

const TitleLine = styled.div(({ between }) => [
  tw`flex items-center font-bold border-b-2 border-b-freelance-pink p-1 w-full`,
  between && tw`justify-between`,
  !between && tw`gap-x-2`,
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
const ButtonLine = tw.div`flex justify-around mx-auto w-[90%]`;

const OrderDetail = (props) => {
  let typeFC = props.userType === 2 ? "ฟรีเเลนซ์:" : "ผู้ว่าจ้าง:";
  const {
    customer_name,
    freelance_name,
    title,
    price,
    description,
    duration,
    due_date,
    status,
    email,
    tel,
  } = props.order;

  let color;
  if (status === "complete" || status === "accept") color = "green";
  if (status === "in progress") color = "orange";
  if (status === "reject" || status === "failed") color = "red";
  if (status === "pending") color = "gray";
  if (status === "close") color = "blue";

  return (
    <>
      <BG>
        <TitleLine between={props.between}>
          <Title>{title}</Title>
          {props.between && (
            <ContainIcon>
              <ImageIcon
                src={PencilIcon}
                onClick={() => {
                  props.setOrderModalPage(3);
                }}
              />
              <ImageIcon
                src={DeleteIcon}
                onClick={props.openConfirmModal.bind(
                  null,
                  "delete",
                  props.order
                )}
              />
            </ContainIcon>
          )}
          {!(props.userType === 1 && props.orderType === "request") &&
            !(props.userType === 2 && props.orderType === "template") && (
              <StatusBar color={color}>{status}</StatusBar>
            )}
        </TitleLine>
        <PriceLine>{`฿ ${price}`}</PriceLine>
        <DescriptionLine>{description}</DescriptionLine>
        <OrderInfo>
          <Li>
            {" "}
            <Time>
              {(props.orderType === "order" &&
                `กำหนดส่ง ${due_date.slice(8, 10)}/${due_date.slice(
                  5,
                  7
                )}/${due_date.slice(0, 4)}`) ||
                `ระยะเวลา ${duration} วัน`}
            </Time>
          </Li>
          <Li>
            <Line>
              <div tw="mr-2 inline">อีเมล</div>
              <PersonalInfo>{email}</PersonalInfo>
            </Line>
          </Li>
          <Li>
            <Line>
              <div tw="mr-2 inline">เบอร์โทรศัพท์</div>
              <PersonalInfo>{tel}</PersonalInfo>
            </Line>
          </Li>
        </OrderInfo>
        {props.orderType !== "template" && (
          <FC>
            <img src={MyOrderAvIcon} />
            <TypeFC>{typeFC}</TypeFC>
            <NameFC>
              {typeFC === "ฟรีเเลนซ์" ? freelance_name : customer_name}
            </NameFC>
          </FC>
        )}
      </BG>
      {(props.userType === 1 ||
        (props.userType === 2 && props.orderType === "order")) && (
        <ButtonLine>
          <Button
            width="40%"
            secondary
            onClick={props.clickLeft}
            disable={
              props.orderType === "request" && props.order.status === "close"
            }
          >
            {props.leftBtn}
          </Button>
          <Button
            width="40%"
            primary
            onClick={props.clickRight}
            disable={
              (props.orderType === "request" &&
                props.order.status === "close") ||
              props.order.status === "failed"
            }
          >
            {props.rightBtn}
          </Button>
        </ButtonLine>
      )}
    </>
  );
};

export default OrderDetail;
