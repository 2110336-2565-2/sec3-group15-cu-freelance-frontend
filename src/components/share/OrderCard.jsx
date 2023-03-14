import tw, { styled } from "twin.macro";
import { useContext } from "react";
import profile from "../../assets/MyOrderAvIcon.svg";
import DurationIcon from "../../assets/DurationIconV2.svg";
import CalendarIcon from "../../assets/CalendarIcon.svg";
import StatusBar from "../orderCard/StatusBar";
import Button from "./Button";
import { AuthContext } from "../../context/AuthProvider";

const Card = styled.div(({ focus }) => [
  tw`flex flex-col h-fit rounded-[20px] min-w-[80vw] w-1/5 shadow-xl relative cursor-pointer p-5 gap-y-3 mr-4`,
  focus && tw`outline outline-2 outline-freelance-pink`,
]);
const Header1 = tw.div`flex justify-between items-center text-mobile-h1 font-bold text-freelance-black-primary`;
const Body = tw.div`text-mobile-small font-normal text-freelance-black-secondary`;
const UserInfo = tw.div`flex gap-x-2 items-center text-mobile-small font-normal text-freelance-black-secondary`;
const Lastline = tw.div`flex justify-between text-mobile-small items-center`;
const Buttonline = tw.div`flex justify-between items-center`;
const Duration = tw.div`flex  gap-x-2 w-fit items-center`;
const Price = tw.div``;

const OrderCard = (props) => {
  const authCtx = useContext(AuthContext);
  let color;
  if (props.hasStatus) {
    if (props.status === "complete" || props.status === "accept")
      color = "green";
    if (props.status === "in progress") color = "orange";
    if (props.status === "reject" || props.status === "failed") color = "red";
    if (props.status === "pending") color = "gray";
    if (props.status === "close") color = "blue";
  }
  let buttonLine = null;
  let onClickLeft, onClickRight;
  if (props.orderType && props.userType && props.userType === 1) {
    let left, right;
    if (props.orderType === "order") {
      left = "ส่งงาน";
      right = "ยกเลิก";
      onClickLeft = props.openConfirmModal.bind(null, "send", props.order);
      onClickRight = props.openConfirmModal.bind(null, "cancel", props.order);
    }
    if (props.orderType === "request") {
      left = "ยอมรับ";
      right = "ปฏิเสธ";
      onClickLeft = props.openConfirmModal.bind(null, "accept", props.order);
      onClickRight = props.openConfirmModal.bind(null, "reject", props.order);
    }
    buttonLine = (
      <Buttonline>
        <Button width="45%" primary onClick={onClickLeft}>
          {left}
        </Button>
        <Button width="45%" secondary onClick={onClickRight}>
          {right}
        </Button>
      </Buttonline>
    );
  }
  // console.log(color);
  return (
    <Card
      hasShadow={true}
      type="order"
      onClick={props.onClick}
      focus={props.selected}
    >
      <Header1>
        {props.header}
        {props.hasStatus && <StatusBar color={color}>{props.status}</StatusBar>}
      </Header1>
      <Body>
        {props.description.slice(0, 100)}
        {props.description.length >= 100 ? "..." : ""}
      </Body>
      <UserInfo>
        <img src={profile} tw="w-[20%]" />
        {`ผู้ว่าจ้าง: ${
          props.customer ? props.customer : authCtx.userInfo.display_name
        }`}
      </UserInfo>
      {props.freelance && (
        <UserInfo>
          <img src={profile} tw="w-[20%]" />
          {"ผู้รับจ้าง: " + props.freelance}
        </UserInfo>
      )}
      <Lastline>
        <Duration>
          <img src={props.duration ? DurationIcon : CalendarIcon} />
          {props.due_date
            ? `${props.due_date.slice(8, 10)}/${props.due_date.slice(
                5,
                7
              )}/${props.due_date.slice(0, 4)}`
            : `${props.duration} วัน`}
        </Duration>
        <Price>{`${props.price}.-`}</Price>
      </Lastline>
      {buttonLine}
    </Card>
  );
};

export default OrderCard;
