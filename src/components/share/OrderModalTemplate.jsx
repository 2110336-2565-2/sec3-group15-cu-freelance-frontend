import OrderModal from "./OrderModal";
import OrderDetail from "../orderModal/OrderDetail";
import RequestDescription from "../order/RequestDescription";
import EditOrder from "../order/EditOrder";
import tw, { styled } from "twin.macro";
import React, { useEffect } from "react";
import { useForm } from "../../hooks/form-hook";
import Button from "./Button";
import { apiClient } from "../../utils/axios";
import SendOrder from "../orderModal/SendOrder";
import ReceiveOrder from "../orderModal/ReceiveOrder";

const SuccessContainer = tw.div`h-[80vh] flex items-center justify-center`;
const Footer1 = styled.div(({}) => [
  tw`flex flex-row w-full gap-x-4 justify-between`,
  // tw`flex flex-row w-full gap-x-4 justify-between dt:absolute bottom-8`
]);
const OrderModalTemplate = (props) => {
  console.log(props.page);
  let content;
  let header;
  if (props.page === 1) {
    content = (
      <OrderDetail
        setOrderModalPage={props.setOrderModalPage}
        openConfirmModal={props.openConfirmModal}
        between={props.orderType === "template"}
        order={props.order}
        orderType={props.orderType}
        userType={props.userType}
        leftBtn={
          props.orderType === "request"
            ? "ปฏิเสธ"
            : props.userType === 1
            ? "ยกเลิก"
            : "ย้อนกลับ"
        }
        rightBtn={
          props.orderType === "request"
            ? "ยอมรับ"
            : props.userType === 1
            ? "ส่งงาน"
            : "รับงาน"
        }
        clickLeft={
          props.orderType === "request"
            ? props.openConfirmModal.bind(null, "reject", props.order)
            : props.openConfirmModal.bind(null, "cancel", props.order)
        }
        clickRight={
          props.orderType === "request"
            ? props.openConfirmModal.bind(null, "accept", props.order)
            : props.userType === 1
            ? props.onClickSendWork
            : props.onClickReceiveWork
        }
      />
    );
  }

  if (props.page === 2) {
    if (props.successType === "edit")
      content = (
        <SuccessContainer>
          <RequestDescription
            hasIconDesc
            title="แก้ไขแบบร่างสำเร็จ"
            desc="ยินดีด้วย แบบร่างของคุณได้ถูกแก้ไขเรียบร้อยแล้ว
  กลับไปดูแบบร่างของคุณได้เลย"
          />
        </SuccessContainer>
      );
    else if (props.successType === "delete")
      content = (
        <SuccessContainer>
          {" "}
          <RequestDescription
            hasIconDesc
            title="ลบแบบร่างสำเร็จ"
            desc="ยินดีด้วย แบบร่างของคุณได้ถูกลบเรียบร้อยแล้ว
        กลับไปที่ออเดอร์ของฉันเพื่อสร้างแบบร่างใหม่ได้"
          />
        </SuccessContainer>
      );
    else if (props.successType === "receive")
      content = (
        <SuccessContainer>
          <RequestDescription
            hasIconDesc
            title="ยืนยันออเดอร์สำเร็จ"
            desc="ยินดีด้วย คุณยืนยันออเดอร์นี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูออเดอร์อื่นๆ"
          />
        </SuccessContainer>
      );
    else if (props.successType === "reject")
      content = (
        <SuccessContainer>
          <RequestDescription
            hasIconDesc
            title="ยืนยันการปฏิเสธคำขอสำเร็จ"
            desc="ยินดีด้วย คุณได้ปฏิเสธคำขอนี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูคำขออื่นๆ"
          />
        </SuccessContainer>
      );
    else if (props.successType === "accept")
      content = (
        <SuccessContainer>
          <RequestDescription
            hasIconDesc
            title="ยืนยันการตอบรับคำขอสำเร็จ"
            desc="ยินดีด้วย คุณได้ตอบรับคำขอนี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูคำขออื่นๆ"
          />
        </SuccessContainer>
      );
    else if (props.successType === "cancel")
      content = (
        <SuccessContainer>
          <RequestDescription
            hasIconDesc
            title="ยืนยันการยกเลิกออเดอร์สำเร็จ"
            desc="ยินดีด้วย คุณได้ยกเลิกออเดอร์นี้เรียบร้อยแล้ว
          กลับไปที่ออเดอร์ของฉันเพื่อดูคำขออื่นๆ"
          />
        </SuccessContainer>
      );
    else if (props.successType === "send")
      content = (
        <SuccessContainer>
          <RequestDescription
            hasIconDesc
            title="ส่งงานสำเร็จ"
            desc="ยินดีด้วย คุณได้ส่งงานนี้เรียบร้อยแล้ว
          เมื่อผู้ว่าจ้างกดยืนยันก็รับเงินได้เลย!!"
          />
        </SuccessContainer>
      );
  }

  const [formState1, inputHandler1, setFormData1] = useForm(
    {
      topic: {
        value: "",
        isValid: false,
      },
      desc: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [formState2, inputHandler2, setFormData2] = useForm(
    {
      price: {
        value: "",
        isValid: false,
      },
      duration: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [formState3, inputHandler3, setFormData3] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    let selectedOrder = props.order;
    setFormData1(
      {
        topic: {
          value: selectedOrder ? selectedOrder.title : null,
          isValid: true,
        },
        desc: {
          value: selectedOrder ? selectedOrder.description : null,
          isValid: true,
        },
      },
      true
    );
    setFormData2(
      {
        price: {
          value: selectedOrder ? selectedOrder.price : null,
          isValid: true,
        },
        duration: {
          value: selectedOrder ? selectedOrder.duration : null,
          isValid: true,
        },
      },
      true
    );
    setFormData3(
      {
        email: {
          value: selectedOrder ? selectedOrder.email : null,
          isValid: true,
        },
        phone: {
          value: selectedOrder ? selectedOrder.tel : null,
          isValid: true,
        },
      },
      true
    );
  }, []);

  let disableButton =
    formState1.isValid & formState2.isValid & formState3.isValid;
  const clickEditHandler = async () => {
    let title = formState1.inputs.topic.value;
    let description = formState1.inputs.desc.value;
    let price = parseInt(formState2.inputs.price.value);
    let duration = parseInt(formState2.inputs.duration.value);
    let email = formState3.inputs.email.value;
    let tel = formState3.inputs.phone.value;
    // let data=JSON.stringify({title,description,pr})
    let data = JSON.stringify({
      title,
      description,
      price,
      duration,
      email,
      tel,
    });
    try {
      const res = await apiClient.put(
        `/order/template/${props.order.id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      props.fetchData();
      props.setOrderModalPage(2);
      props.setSuccessType("edit");
    } catch (err) {
      console.log(err);
    }
  };
  if (props.page === 3) {
    header = "เเก้ไขแบบร่าง";
    content = (
      <>
        <EditOrder
          inputHandler1={inputHandler1}
          inputHandler2={inputHandler2}
          inputHandler3={inputHandler3}
          show={true}
          initialValue={props.order}
        />{" "}
        <Footer1>
          <Button
            onClick={() => {
              props.setOrderModalPage(1);
            }}
            width="50%"
            secondary
          >
            ย้อนกลับ
          </Button>
          <Button
            disable={!disableButton}
            onClick={clickEditHandler}
            width="50%"
            primary
          >
            เเก้ไข
          </Button>
        </Footer1>
      </>
    );
  }

  if (props.page === 1 && props.orderType === "template")
    header = "รายละเอียดแบบร่าง";
  else if (props.page === 1 && props.orderType === "request")
    header = "รายละเอียดคำขอ";
  else if (props.page === 1 && props.orderType === "order")
    header = "รายละเอียดออเดอร์";

  if (props.page === 2) {
    if (props.successType === "edit" || props.successType === "edit")
      header = "เเก้ไขแบบร่าง";
    else if (
      props.successType === "receive" ||
      props.successType === "accept" ||
      props.successType === "reject"
    )
      header = "รายละเอียดคำขอ";
    else if (props.successType === "send") header = "ส่งงาน";
    else if (props.successType === "cancel") header = "รายละเอียดออเดอร์";
  }

  if (props.page === 4) {
    header = "ส่งงาน";
    content = (
      <SendOrder
        onClose={props.onClose}
        handleConfirmSend={props.openConfirmModal.bind(
          null,
          "send",
          props.order
        )}
        formState={props.formState}
        inputHandler={props.inputHandler}
      />
    );
  }

  if (props.page === 5) {
    header = "ตรวจรับงาน";
    content = <ReceiveOrder id={props.order.id} />;
  }

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
