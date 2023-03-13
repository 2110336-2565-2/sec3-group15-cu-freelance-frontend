import tw, {styled} from "twin.macro"
import ProgressBar from "../components/register/ProgressBar";
import { useReducer, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import { AuthContext } from "../context/AuthProvider";
import CreateOrder1 from "../components/order/CreateOrder1";
import CreateOrder2 from "../components/order/CreateOrder2";
import CreateOrder3 from "../components/order/CreateOrder3";
import CreateOrder4 from "../components/order/CreateOrder4";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import Button from "../components/share/Button";
const Container = styled.div(({})=>[
    tw``
])
const CreateOrderRequest = ()=>{
    const [state, dispatch] = useReducer(reducer, { value: 1 })
    const [progress, setProgress] = useState(1);
    const [loading, setLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    
    const onChangeStateHandler = (value) => {
        dispatch({ type: "CHANGESTATE", value: value });
    };
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
            freelance_id: "test",
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
          const bt1OnclickHandler = ()=>{
            navigate('/search');
          }
          const bt2OnClickHandler = ()=>{
            navigate('/home');
          }
          navigate('/request-complete', {
                                        state:{
                                            title:"การสร้างออเดอร์สำเร็จ",
                                            desc:"ยินดีด้วย ออเดอร์ของคุณถูกสร้าง เลือกฟรีแลนซ์ที่ถูกใจแล้วกดส่งได้เลย!",
                                            bt1Text:"เลือกฟรีแลนซ์",
                                            bt2Text:"กลับหน้าหลัก",
                                            bt2:"true",
                                            path1:"/search",
                                            path2:"/home",
                                        }
                                        //bt1OnclickHandler
                                    });
    }
    const [formState1, inputHandler1] = useForm(
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
    
      const [formState2, inputHandler2] = useForm(
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
    
      const [formState3, inputHandler3] = useForm(
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
    ((state.value === 1) & !formState1.isValid) |
    ((state.value === 2) & !formState2.isValid) |
    ((state.value === 3) & !formState3.isValid);
    return (
        <Container>
            <Title show={state.value!=4}>สร้างแบบร่างแบบใหม่</Title>
            <ProgressBar
            onClick={onChangeStateHandler}
            state={state.value}
            progress={progress}
            formValid={{
            form1: formState1.isValid,
            form2: formState2.isValid,
            form3: formState3.isValid,
            }}
            step={4}
            text1={step[0]}
            text2={step[1]}
            text3={step[2]}
            text4={step[3]}
            />
            <Step>{state.value==4 ? "ตรวจสอบออเดอร์อีกครั้ง" : step[state.value-1]}</Step>
            <StepDesc>{stepDesc[state.value-1]}</StepDesc>
            <CreateOrder1 inputHandler1={inputHandler1} show={state.value==1}/>
            <CreateOrder2 inputHandler2={inputHandler2} show={state.value==2}/>
            <CreateOrder3 inputHandler3={inputHandler3} show={state.value==3}/>
            <CreateOrder4 topic={formState1.inputs.topic.value}
                          desc={formState1.inputs.desc.value}
                          price={formState2.inputs.price.value}
                          duration={formState2.inputs.duration.value}
                          email={formState3.inputs.email.value}
                          phone={formState3.inputs.phone.value}
                          show={state.value==4}
            />
            {state.value!=4 ? <Footer1>
                <Button onClick={backHandler} width="50%" secondary>ย้อนกลับ</Button>
                <Button disable={disableButton} onClick={continueHandler} width="50%" primary>ถัดไป</Button>
            </Footer1>
            :
            <Footer2>
                <Button onClick={submitHandler} width='w-full' primary>ยืนยันการสร้าง</Button>
                <Back2Edit onClick={backHandler}><u>กลับไปแก้ไข</u></Back2Edit>
            </Footer2>
            }
            
        </Container>
    return (
        <Container>
            
        </Container>
    )
}
export default CreateOrderRequest;