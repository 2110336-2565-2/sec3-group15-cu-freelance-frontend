import RequestComplete from "../../pages/RequestComplete";
import ConfirmModal from "./ConfirmModal";
import DeleteIcon from "../../assets/DeleteProIcon.svg";
import CheckIcon from "../../assets/CheckIconFull.svg";
import CrossIcon from "../../assets/CrossIcon.svg";
import AcceptIcon from "../../assets/AcceptIcon.svg";
import { apiClient } from "../../utils/axios";

const ConfirmModalTemplate = (props) => {
  let content = null;
  const page = props.page;
  let id;
  if (props.order) id = props.order.id;

  const clickAccept = async () => {
    try {
      const res = await apiClient.patch(`/order/request/${id}/accept`);
      props.fetchData();
      props.setSuccessType("accept");
      props.setOrderModalPage(2);
      props.setShowOrderModal(true);
      props.setShowConfirmModal(false);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const clickReject = async () => {
    try {
      const res = await apiClient.patch(`/order/request/${id}/reject`);
      console.log(res);
      props.fetchData();
      props.setOrderModalPage(2);
      props.setSuccessType("reject");
      props.setShowOrderModal(true);
      props.setShowConfirmModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const clickDelete = async () => {
    try {
      const res = await apiClient.delete(`/order/template/${id}`);
      console.log(res);
      props.fetchData();
      props.setOrderModalPage(2);
      props.setSuccessType("delete");
      props.setShowOrderModal(true);
      props.setShowConfirmModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCancel = async () => {
    try {
      const res = await apiClient.put(`/order/${id}/cancel`);
      console.log(res);
      props.fetchData();
      props.setOrderModalPage(2);
      props.setSuccessType("cancel");
      props.setShowOrderModal(true);
      props.setShowConfirmModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (page === "delete") {
    content = (
      <RequestComplete
        icon={DeleteIcon}
        hasIconDesc={false}
        title="ยืนยันการลบแบบร่าง"
        desc="หากคุณยืนยันการลบแบบร่างแล้ว คุณจะไม่สามารถกู้คืนแบบร่างมาได้อีก"
        lftOnclick={props.cancel}
        rgtOnclick={clickDelete}
        isModal={true}
      />
    );
  }
  if (page === "receive") {
    content = (
      <RequestComplete
        icon={CheckIcon}
        hasIconDesc={false}
        title="ยืนยันออเดอร์"
        desc="หากคุณยืนยันออเดอร์แล้ว จะไม่สามารถเคลมเงินคืนภายหลังได้"
        lftOnclick={props.cancel}
        rgtOnclick={props.clickReceive}
        isModal={true}
      />
    );
  }
  if (page === "reject") {
    content = (
      <RequestComplete
        icon={CrossIcon}
        hasIconDesc={false}
        title="ยืนยันการปฏิเสธคำขอ"
        desc="หากคุณยืนยันการปฏิเสธคำขอแล้ว คุณจะไม่สามารถตอบรับคำขอนี้หลังจากนี้ได้"
        lftOnclick={props.cancel}
        rgtOnclick={clickReject}
        red
        isModal={true}
      />
    );
  }
  if (page === "accept") {
    content = (
      <RequestComplete
        icon={AcceptIcon}
        hasIconDesc={false}
        title="ยืนยันการตอบรับคำขอ"
        desc="หากคุณยืนยันการตอบรับคำขอแล้ว ความสำเร็จของคุณในงานนี้จะถูกบันทึกใส่ระบบ"
        lftOnclick={props.cancel}
        rgtOnclick={clickAccept}
        isModal={true}
      />
    );
  }
  if (page === "cancel") {
    content = (
      <RequestComplete
        icon={CrossIcon}
        hasIconDesc={false}
        title="ยืนยันการยกเลิกออเดอร์"
        desc="คุณจะไม่ได้รับค่าตอบแทนและจะถูกเก็บประวัติการยกเลิกออเดอร์ไว้ในระบบ"
        lftOnclick={props.cancel}
        rgtOnclick={handleClickCancel}
        red
        isModal={true}
      />
    );
  }
  if (page === "send") {
    content = (
      <RequestComplete
        icon={CheckIcon}
        hasIconDesc={false}
        title="ยืนยันการส่งงาน"
        desc="เมื่อคุณส่งงานไปแล้วจะกลับมาแก้ไขไม่ได้อีก"
        lftOnclick={props.cancel}
        rgtOnclick={props.clickSend}
        isModal={true}
      />
    );
  }
  return (
    <ConfirmModal show={props.show} content={content} onCancel={props.cancel} />
  );
};
export default ConfirmModalTemplate;
