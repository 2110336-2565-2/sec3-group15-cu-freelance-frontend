import tw, {styled} from "twin.macro"
import ProgressBar from "../components/register/ProgressBar";
import { useReducer, useState, useContext,  useEffect } from "react";
import { useLocation, useNavigate,useSearchParams } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import { AuthContext } from "../context/AuthProvider";
import CreateOrder1 from "../components/order/CreateOrder1";
import CreateOrder2 from "../components/order/CreateOrder2";
import CreateOrder3 from "../components/order/CreateOrder3";
import CreateOrder4 from "../components/order/CreateOrder4";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import Button from "../components/share/Button";
import OrderCard from "../components/share/OrderCard";
import "./MyOrder.css";
import EditOrder from "../components/order/EditOrder";
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
const StepContainer = styled.div(()=>[
    tw`flex flex-col`,
])
const Title = styled.div(({show})=>[
    tw`font-ibm font-bold text-mobile-h1 dt:text-2xl text-center my-4`,
    !show&&tw`hidden`
])
const SendTo = styled.div(()=>[
    tw`font-ibm text-mobile-small text-freelance-black-primary font-normal`
])
const Step = styled.div(({})=>[
    tw`font-ibm font-bold text-mobile-h1 dt:text-2xl text-freelance-black-primary mt-4`
])
const StepDesc = styled.div(({})=>[
    tw`font-ibm font-normal text-mobile-small dt:text-base text-freelance-black-secondary mr-4`
])
const OrderContainer = tw.div`flex  w-full max-w-full overflow-auto pl-4 min-h-[40vh] dt:min-h-[30vh] items-center`;
const LoadingDiv = tw.div`font-ibm`;

const Footer1 = styled.div(({})=>[
    tw`flex flex-row w-full gap-x-4 justify-between`
    // tw`flex flex-row w-full gap-x-4 justify-between dt:absolute bottom-8`
])
const Footer2 = styled.div(({})=>[
    tw`flex flex-col items-center gap-y-4 dt:absolute bottom-8`
])
const Back2Edit = styled.button(({})=>[
    tw`text-center font-ibm decoration-solid font-medium text-mobile-small`
])
const step = ["เลือกแบบร่าง", "แก้ไขออเดอร์", "ตรวจสอบออเดอร์"];
const stepDesc = ["เลือกแบบร่างที่จะส่งให้ฟรีแลนซ์ของคุณ สามารถแก้ไขรายละเอียดได้ภายหลัง",
                  "แก้ไขออเดอร์ของคุณ เพื่อให้ได้รายละเอียดที่เหมาะสมกับฟรีแลนซ์แต่ละคน",
                  "ตรวจสอบความถูกต้องของออเดอร์คุณอีกครั้ง ถ้าถูกต้องก็ส่งออเดอร์ได้เลย!!"];
const CreateOrderRequest = ()=>{
    const [state, dispatch] = useReducer(reducer, { value: 1 })
    const [SelectedOrder, setSelectedOrder] = useState(false);
    const [progress, setProgress] = useState(1);
    const [loading, setLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    //InfiniteScroll or Pagination
    const pageParams = searchParams.get("pages") || 1;
    const [page, setPage] = useState(pageParams);
    const onChangeStateHandler = (value) => {
        dispatch({ type: "CHANGESTATE", value: value });
    };
    const onClickCardHandler = (order) => {
        setSelectedOrder(true);
        setFormData1({
            topic: {
                value:order.title,
                isValid:true,
            },
            desc: {
                value:order.description,
                isValid:true,
            },
        },true)
        setFormData2({
            price: {
                value:order.price,
                isValid:true,
            },
            duration: {
                value:order.duration,
                isValid:true,
            },
        },true)
        setFormData3({
            email: {
                value:order.email,
                isValid:true,
            },
            desc: {
                value:order.phone,
                isValid:true,
            },
        },true)
    }
    const continueHandler = () => {
        dispatch({ type: "CHANGESTATE", value: state.value + 1 });
        setProgress(state.value + 1);
    };
    const backHandler = () => {
        if(state.value==1){
            navigate(-1);
        }
        dispatch({type: "CHANGESTATE", value: state.value - 1});
        setProgress(state.value - 1);
    };
    const submitHandler = async()=> {
        let data = JSON.stringify({
            customer_id: authCtx.userInfo.id,
            description: formState1.inputs.desc.value,
            duration: parseInt(formState2.inputs.duration.value),
            freelance_id: location.state.id,
            order_template_id: "test",
            email: formState3.inputs.email.value,
            price: parseInt(formState2.inputs.price.value),
            status: parseInt(0),
            tel: formState3.inputs.phone.value,
            title: formState1.inputs.topic.value,
          });
          console.log(data);
          let response = await apiClient.post("/order/template", data, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(response.data);
          navigate('/request-complete', {
                                        state:{
                                            title:"การส่งออเดอร์สำเร็จ",
                                            desc:"ยินดีด้วย ออเดอร์ของคุณถูกส่งให้ฟรีแลนซ์ เมื่อฟรีแลนซ์รับออเดอร์ก็เริ่มงานได้เลย!",
                                            bt1Text:"กลับหน้าหลัก",
                                            path1:"/home",
                                        }
                                    });
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
    const navigate = useNavigate();
    const disableButton =
    ((state.value === 1) & !SelectedOrder)      |
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
        } catch (err) {
        console.log(err);
        }
        setIsLoadingOrder(false);
    };
    useEffect(() => {
        fetchData("template", page);
    }, [
        // keyword,
        page,
    ]);
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
                <Step>{state.value==4 ? "ตรวจสอบออเดอร์อีกครั้ง" : step[state.value-1]}</Step>
                <SendTo>ถึง: {location.state.displayName}</SendTo>
            </StepContainer>
            <StepDesc>{stepDesc[state.value-1]}</StepDesc>
            <OrderContainer>
            {isLoadingOrder && <LoadingDiv>loading...</LoadingDiv>}
            {!isLoadingOrder && (
                // orders &&
                // orders.map((order, idx) => (
                //   <OrderCard
                //     key={idx}
                //     header={order.title}
                //     description={order.description}
                //     from={"hello"}
                //     to={"hello"}
                //     duration="7"
                //     price="2000"
                //     hasStatus={
                //       selectOrder !== "template" &&
                //       (selectOrder !== "request" || userType !== 1)
                //     }
                //     status="In Progress"
                //   />))
                <OrderCard
                key={"idx"}
                header={"order.title"}
                description={"order.description"}
                customer={"customer"}
                freelance={
                    null
                }
                duration="7"
                price="2000"
                hasStatus={
                    false
                }
                status="In Progress"
                orderType={"template"}
                userType={authCtx.userInfo.user_type}
                onClick={onClickCardHandler.bind(null, "order")}
                />
            )}
            </OrderContainer>
            <CreateOrder1 inputHandler1={inputHandler1} show={state.value==2}/>
            <CreateOrder2 inputHandler2={inputHandler2} show={state.value==2}/>
            <CreateOrder3 inputHandler3={inputHandler3} show={state.value==2}/>
            <EditOrder inputHandler1={inputHandler1}
                       inputHandler2={inputHandler2}
                       inputHandler3={inputHandler3}
                       show={state.value==2}/>
            <CreateOrder4 topic={formState1.inputs.topic.value}
                          desc={formState1.inputs.desc.value}
                          price={formState2.inputs.price.value}
                          duration={formState2.inputs.duration.value}
                          email={formState3.inputs.email.value}
                          phone={formState3.inputs.phone.value}
                          show={state.value==3}
            />
            {state.value!=4 ? <Footer1>
                <Button onClick={backHandler} width="50%" secondary>ย้อนกลับ</Button>
                <Button disable={disableButton} onClick={continueHandler} width="50%" primary>ถัดไป</Button>
            </Footer1>
            :
            <Footer2>
                <Button onClick={submitHandler} width='w-full' primary>ส่งออเดอร์</Button>
                <Back2Edit onClick={backHandler}><u>กลับไปแก้ไข</u></Back2Edit>
            </Footer2>
            }
            
        </Container>
    )
}
export default CreateOrderRequest;