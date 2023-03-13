import OrderModal from "./OrderModal";
import OrderDetail from "../orderModal/OrderDetail";

const OrderModalTemplate = (props) => {
  let content;
  if (props.page === 1) {
    content = (
      <OrderDetail
        between={props.orderType === "template"}
        order={props.order}
        orderType={props.orderType}
        userType={props.userType}
        leftBtn={props.orderType==="request"?"ยอมรับ":"ส่งงาน"}
        rightBtn={props.orderType==="request"?"ปฏิเสธ":"ยกเลิก"}
      />
    );
  }
  let header;
  if (props.page === 1 && props.orderType === "template")
    header = "รายละเอียดแบบร่าง";
  else if (props.page === 1 && props.orderType === "request")
    header = "รายละเอียดคำขอ";
  else if (props.page === 1 && props.orderType === "order")
    header = "รายละเอียดออเดอร์";

  console.log("hello2");
  return (
    <OrderModal
      content={content}
      header={header}
      onClose={props.onClose}
      show={props.show}
    />
  );
};

export default OrderModalTemplate;
