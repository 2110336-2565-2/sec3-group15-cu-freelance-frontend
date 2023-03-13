import OrderModal from "./OrderModal";
import OrderDetail from "../orderModal/OrderDetail";
import RequestDescription from "../order/RequestDescription";

const OrderModalTemplate = (props) => {
  let content;
  if (props.page === 1) {
    content = (
      <OrderDetail
        between={props.orderType === "template"}
        order={props.order}
        orderType={props.orderType}
        userType={props.userType}
        leftBtn={props.orderType === "request" ? "ยอมรับ" : "ส่งงาน"}
        rightBtn={props.orderType === "request" ? "ปฏิเสธ" : "ยกเลิก"}
        clickLeft={
          props.orderType === "request"
            ? props.openConfirmModal.bind(null, "accept", props.order)
            : props.openConfirmModal.bind(null, "send", props.order)
        }
        clickRight={
          props.orderType === "request"
            ? props.openConfirmModal.bind(null, "reject", props.order)
            : props.openConfirmModal.bind(null, "cancel", props.order)
        }
      />
    );
  }
  console.log(props.page, props.successType);
  if (props.page === 2) {
    if (props.successType === "edit")
      content = (
        <RequestDescription
          hasIconDesc
          title="แก้ไขแบบร่างสำเร็จ"
          desc="ยินดีด้วย แบบร่างของคุณได้ถูกแก้ไขเรียบร้อยแล้ว
    กลับไปดูแบบร่างของคุณได้เลย"
        />
      );
    else if (props.successType === "delete")
      content = (
        <RequestDescription
          hasIconDesc
          title="ลบแบบร่างสำเร็จ"
          desc="ยินดีด้วย แบบร่างของคุณได้ถูกลบเรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อสร้างแบบร่างใหม่ได้"
        />
      );
    else if (props.successType === "receive")
      content = (
        <RequestDescription
          hasIconDesc
          title="ยืนยันออเดอร์สำเร็จ"
          desc="ยินดีด้วย คุณยืนยันออเดอร์นี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูออเดอร์อื่นๆ"
        />
      );
    else if (props.successType === "reject")
      content = (
        <RequestDescription
          hasIconDesc
          title="ยืนยันการปฏิเสธคำขอสำเร็จ"
          desc="ยินดีด้วย คุณได้ปฏิเสธคำขอนี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูคำขออื่นๆ"
        />
      );
    else if (props.successType === "accept")
      content = (
        <RequestDescription
          hasIconDesc
          title="ยืนยันการตอบรับคำขอสำเร็จ"
          desc="ยินดีด้วย คุณได้ตอบรับคำขอนี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูคำขออื่นๆ"
        />
      );
    else if (props.successType === "cancel")
      content = (
        <RequestDescription
          hasIconDesc
          title="ยืนยันการยกเลิกออเดอร์สำเร็จ"
          desc="ยินดีด้วย คุณได้ยกเลิกออเดอร์นี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูคำขออื่นๆ"
        />
      );
    else if (props.successType === "send")
      content = (
        <RequestDescription
          hasIconDesc
          title="ส่งงานสำเร็จ"
          desc="ยินดีด้วย คุณได้ส่งงานนี้เรียบร้อยแล้ว
          เมื่อผู้ว่าจ้างกดยืนยันก็รับเงินได้เลย!!"
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
