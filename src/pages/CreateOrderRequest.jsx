import tw, { styled } from "twin.macro";
import ProgressBar from "../components/register/ProgressBar";
import { useReducer, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import { AuthContext } from "../context/AuthProvider";
import CreateOrder4 from "../components/order/CreateOrder4";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import Button from "../components/share/Button";
import OrderCard from "../components/share/OrderCard";
import "./MyOrder.css";
import EditOrder from "../components/order/EditOrder";
import { OrderContext } from "../context/OrderProvider";
import LoadingSpinner from "../components/share/LoadingSpinner";
import CreatedTemplateCard from "../components/order/CreatedTemplateCard";
function reducer(state, action) {
  if (action.type == "CHANGESTATE") {
    return {
      value: action.value,
    };
  }
}
const Container = tw.div`flex flex-col mt-[10vh] p-4 min-h-[85vh] gap-y-2 
w-[90%] max-w-[500px] dt:w-[90%] dt:max-w-[1000px] 
relative mx-auto`;
const StepContainer = styled.div(() => [tw`flex flex-col text-center my-4`]);
const Title = styled.div(({ show }) => [
  tw`font-ibm font-bold text-mobile-h1 dt:text-2xl text-center my-4`,
  !show && tw`hidden`,
]);
const SendTo = styled.div(() => [
  tw`font-ibm text-mobile-small text-freelance-black-primary font-normal`,
]);
const Step = styled.div(({}) => [
  tw`font-ibm font-bold text-mobile-h1 dt:text-2xl text-freelance-black-primary mt-4`,
]);
const StepDesc = styled.div(({}) => [
  tw`font-ibm font-normal text-mobile-body dt:text-base text-center text-freelance-black-secondary mr-4`,
]);
const OrderContainer = tw.div`flex gap-x-5  w-full max-w-full overflow-auto pl-4 dt:min-h-[30vh] h-[250px] items-center`;
const LoadingDiv = tw.div`w-full`;

const Footer1 = styled.div(({}) => [
  tw`flex flex-row w-full gap-x-4 justify-between`,
  // tw`flex flex-row w-full gap-x-4 justify-between dt:absolute bottom-8`
]);
const Footer2 = styled.div(({}) => [
  tw`flex flex-col tbl:flex-row items-center gap-y-4 dt:absolute bottom-8`,
]);
const Back2Edit = styled.button(({}) => [
  tw`text-center font-ibm decoration-solid font-medium text-mobile-small`,
]);
const step = ["เลือกแบบร่าง", "แก้ไขออเดอร์", "ตรวจสอบออเดอร์"];
const stepDesc = [
  "เลือกแบบร่างที่จะส่งให้ฟรีแลนซ์ของคุณ สามารถแก้ไขรายละเอียดได้ภายหลัง",
  "แก้ไขออเดอร์ของคุณ เพื่อให้ได้รายละเอียดที่เหมาะสมกับฟรีแลนซ์แต่ละคน",
  "ตรวจสอบความถูกต้องของออเดอร์คุณอีกครั้ง ถ้าถูกต้องก็ส่งออเดอร์ได้เลย!!",
];
const CreateOrderRequest = () => {
  const [state, dispatch] = useReducer(reducer, { value: 1 });
  const [avatar, setAvatar] = useState(null);
  const orderCtx = useContext(OrderContext);
  // console.log(orderCtx);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  //InfiniteScroll or Pagination
  const pageParams = searchParams.get("pages") || 1;
  const [page, setPage] = useState(pageParams);
  const onChangeStateHandler = (value) => {
    dispatch({ type: "CHANGESTATE", value: value });
  };
  const [isLoadingOne, setIsLoadingOne] = useState(false);
  useEffect(() => {
    const fetchOne = async () => {
      try {
        setIsLoadingOne(true);
        const res = await apiClient.get(`/order/template/${selectedOrder.id}`);
      } catch (err) {
        console.log(err);
      }
      setIsLoadingOne(false);
    };
    if (selectedOrder) {
      fetchOne();
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
    }
  }, [selectedOrder]);
  const onClickCardHandler = (order) => {
    // console.log(order)
    setSelectedOrder(order);
  };
  const continueHandler = () => {
    dispatch({ type: "CHANGESTATE", value: state.value + 1 });
    setProgress(state.value + 1);
  };
  const backHandler = () => {
    if (state.value == 1) {
      navigate(`/portfolio/${orderCtx.portID}`);
    }
    dispatch({ type: "CHANGESTATE", value: state.value - 1 });
    setProgress(state.value - 1);
  };
  const submitHandler = async () => {
    let data = JSON.stringify({
      customer_id: authCtx.userInfo.id,
      description: formState1.inputs.desc.value,
      duration: parseInt(formState2.inputs.duration.value),
      email: formState3.inputs.email.value,
      freelance_id: orderCtx.freelanceID,
      order_template_id: selectedOrder.id,
      price: parseInt(formState2.inputs.price.value),
      tel: formState3.inputs.phone.value,
      title: formState1.inputs.topic.value,
    });
    console.log(data);
    let response = await apiClient.post("/order/request", data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    navigate("/request-complete", {
      state: {
        title: "การส่งออเดอร์สำเร็จ",
        desc: "ยินดีด้วย ออเดอร์ของคุณถูกส่งให้ฟรีแลนซ์ เมื่อฟรีแลนซ์รับออเดอร์ก็เริ่มงานได้เลย!",
        bt1Text: "ไปหน้าออเดอร์ของฉัน",
        path1: "/my-order?q=request&pages=1",
      },
    });
  };
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
  const navigate = useNavigate();
  const disableButton =
    ((state.value === 1) & !selectedOrder) |
    ((state.value === 2) & !formState1.isValid) |
    ((state.value === 2) & !formState2.isValid) |
    ((state.value === 2) & !formState3.isValid);
  const [orders, setOrders] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const fetchData = async (headerType, page) => {
    let ht = "/" + headerType;
    if (ht === "/order") ht = "";
    setIsLoadingOrder(true);
    try {
      let params = {
        limit: 6,
        page: page,
        // keyword: keyword,
      };
      for (let param in params) {
        if (
          params[param] === undefined ||
          params[param] === null ||
          params[param] === ""
        ) {
          delete params[param];
        }
      }

      let response;
      response = await apiClient.get(
        `/order${ht}?` + new URLSearchParams(params).toString()
      );
      console.log(response.data);
      setOrders(response.data.order_templates);
      setMeta(response.data.meta);
      response = await apiClient.get(`/file/avatar?id=${authCtx.userInfo.id}`);
      console.log(response.data);
      setAvatar(response.data.avatars[0].url);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingOrder(false);
  };
  useEffect(() => {
    fetchData("template", page);
  }, [page]);
  return (
    <Container>
      <ProgressBar
        onClick={onChangeStateHandler}
        state={state.value}
        progress={progress}
        formValid={{
          form1: formState1.isValid,
          form2: formState2.isValid,
          form3: formState3.isValid,
        }}
        text1={step[0]}
        text2={step[1]}
        text3={step[2]}
      />
      <StepContainer>
        <Step>
          {state.value == 4 ? "ตรวจสอบออเดอร์อีกครั้ง" : step[state.value - 1]}
        </Step>
        <SendTo>ถึง: {orderCtx.flDisplayName}</SendTo>
      </StepContainer>
      <StepDesc>{stepDesc[state.value - 1]}</StepDesc>
      {state.value == 1 && (
        <OrderContainer>
          {isLoadingOrder && (
            <LoadingDiv>
              <LoadingSpinner />
            </LoadingDiv>
          )}
          {!isLoadingOrder&&<CreatedTemplateCard />}
          {!isLoadingOrder &&
            orders && 
            orders.map((order, idx) => {
              return (
                <OrderCard
                  key={idx}
                  selected={selectedOrder && selectedOrder.id === order.id}
                  header={order.title}
                  description={order.description}
                  duration={order.duration}
                  customer={authCtx.userInfo.display_name}
                  avatar={avatar}
                  price={order.price}
                  freelance={null}
                  hasStatus={false}
                  status="In Progress"
                  orderType={"template"}
                  userType={authCtx.userInfo.user_type}
                  onClick={onClickCardHandler.bind(null, order)}
                />
              );
            })}
        </OrderContainer>
      )}
      {!isLoadingOne && (
        <EditOrder
          inputHandler1={inputHandler1}
          inputHandler2={inputHandler2}
          inputHandler3={inputHandler3}
          show={state.value == 2}
          initialValue={selectedOrder}
        />
      )}
      <CreateOrder4
        topic={formState1.inputs.topic.value}
        desc={formState1.inputs.desc.value}
        price={formState2.inputs.price.value}
        duration={formState2.inputs.duration.value}
        email={formState3.inputs.email.value}
        phone={formState3.inputs.phone.value}
        show={state.value == 3}
      />
      {state.value != 3 ? (
        <Footer1>
          <Button onClick={backHandler} width="50%" secondary>
            ย้อนกลับ
          </Button>
          <Button
            disable={disableButton}
            onClick={continueHandler}
            width="50%"
            primary
          >
            ถัดไป
          </Button>
        </Footer1>
      ) : (
        <Footer1>
          <Button onClick={backHandler} width="50%" secondary>
            <u>กลับไปแก้ไข</u>
          </Button>
          <Button onClick={submitHandler} width="50%" primary>
            ส่งออเดอร์
          </Button>
        </Footer1>
      )}
    </Container>
  );
};
export default CreateOrderRequest;
