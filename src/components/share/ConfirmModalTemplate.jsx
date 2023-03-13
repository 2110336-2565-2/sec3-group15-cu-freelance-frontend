import RequestComplete from "../../pages/RequestComplete";
import ConfirmModal from "./ConfirmModal";
import DeleteIcon from "../../assets/DeleteProIcon.svg";
import CheckIcon from "../../assets/CheckIconFull.svg";
import CrossIcon from "../../assets/CrossIcon.svg";
import AcceptIcon from "../../assets/AcceptIcon.svg";

const ConfirmModalTemplate = (props) => {
  let content = null;
  const page = props.page;
  if (page === "delete") {
    content = (
      <RequestComplete
        icon={DeleteIcon}
        hasIconDesc={false}
        title="ยืนยันการลบแบบร่าง"
        desc="หากคุณยืนยันการลบแบบร่างแล้ว คุณจะไม่สามารถกู้คืนแบบร่างมาได้อีก"
        lftOnclick={props.cancel}
        rgtOnclick={props.clickDelete}
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
        rgtOnclick={props.clickReject}
        red
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
        rgtOnclick={props.clickAccept}
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
        rgtOnclick={props.clickCancel}
        red
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
      />
    );
  }
  return <ConfirmModal show={props.show} content={content} onCancel={props.cancel}/>;
};
export default ConfirmModalTemplate;
