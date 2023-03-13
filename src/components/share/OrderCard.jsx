import tw from "twin.macro";
import profile from "../../assets/MyOrderAvIcon.svg";
import DurationIcon from "../../assets/DurationIconV2.svg";
import CalendarIcon from "../../assets/CalendarIcon.svg";
import StatusBar from "../orderCard/StatusBar";
import Button from "./Button";

const Card = tw.div`flex flex-col h-fit rounded-[20px] min-w-[260px] w-1/5 shadow-xl relative cursor-pointer p-5 gap-y-3 mr-4`;
const Header1 = tw.div`flex justify-between items-center text-mobile-h1 font-bold text-freelance-black-primary`;
const Body = tw.div`text-mobile-small font-normal text-freelance-black-secondary`;
const UserInfo = tw.div`flex gap-x-2 items-center text-mobile-small font-normal text-freelance-black-secondary`;
const Lastline = tw.div`flex justify-between text-mobile-small items-center`;
const Buttonline = tw.div`flex justify-between items-center`;
const Duration = tw.div`flex  gap-x-2 w-fit items-center`;
const Price = tw.div``;

const OrderCard = (props) => {
  let color;
  if (props.hasStatus) {
    if (props.status === "Completed" || props.status === "Accept")
      color = "green";
    if (props.status === "In Progress") color = "orange";
    if (props.status === "Reject" || props.status === "Failed") color = "red";
    if (props.status === "Pending") color = "gray";
    if (props.status === "Closed") color = "blue";
  }
  let buttonLine = null;
  let onClickLeft,onClickRight
  if (props.orderType && props.userType && props.userType === 1) {
    let left, right;
    if (props.orderType === "order") {
      left = "ส่งงาน";
      right = "ยกเลิก";
      onClickLeft=props.openConfirmModal.bind(null,"send")
      onClickRight=props.openConfirmModal.bind(null,"cancel")
    }
    if (props.orderType === "request") {
      left = "ยอมรับ";
      right = "ปฏิเสธ";
      onClickLeft=props.openConfirmModal.bind(null,"accept")
      onClickRight=props.openConfirmModal.bind(null,"reject")
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
    <Card hasShadow={true} type="order" onClick={props.onClick}>
      <Header1>
        {props.header}
        {props.hasStatus && <StatusBar color={color}>{props.status}</StatusBar>}
      </Header1>
      <Body>{props.description}</Body>
      <UserInfo>
        <img src={profile} tw="w-[20%]" />
        {"ผู้ว่าจ้าง: " + props.customer}
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
          {props.duration ? `${props.duration} วัน` : props.day}
        </Duration>
        <Price>{`${props.price}.-`}</Price>
      </Lastline>
      {buttonLine}
    </Card>
  );
};

export default OrderCard;
