import tw from "twin.macro"
import Input from "../components/share/Input"
import React from "react";
import { useForm } from "../hooks/form-hook"
import { VALIDATOR_PHONE, VALIDATOR_REQUIRE } from "../components/share/Validate";
import { apiClient } from "../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useEffect } from "react";
import Toast from "../components/share/Toast";
import successIcon from "../assets/SuccessIcon.svg"
import { useState } from "react";
const Container = tw.div`flex justify-center pt-[20vh] min-h-[95vh]`;
const Form = tw.form`flex flex-col shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 py-4 rounded-[20px] gap-y-2 w-[420px] h-fit`;
const Title = tw.div`text-center font-bold text-3xl`;
const SubmitButton = tw.button`bg-[#D62B70] text-center m-2 text-white font-inter font-bold rounded-[10px] p-2 text-xl`;
const EditProfilePage = ()=> {
    const authCtx=useContext(AuthContext);
    const [submitState, setSubmitState] = useState(0);
    const [formState, inputHandler, setFormData] = useForm({
        Firstname: {
            value:"",
            isValid:true,
        },
        Lastname: {
            value:"",
            isValid:true,
        },
        PhoneNumber: {
            value:"",
            isValid:true,
        },
        Username: {
            value:"",
            isValid:true,
        },
        Displayname: {
            value:"",
            isValid:true,
        }
    },true
    )
    const formSubmitHandler = async(event)=>{
        event.preventDefault();
        const { Firstname, Lastname, PhoneNumber, Username, Displayname} =
                formState.inputs;
        try{
            let data = JSON.stringify({
                display_name: Displayname.value,
                firstname: Firstname.value,
                lastname: Lastname.value,
                phone: PhoneNumber.value
              });
            const response = await apiClient.patch(`/user`, data, {
                headers: { "Content-Type": "application/json" },
            });
            setSubmitState(1);
            setTimeout(() => { setSubmitState(0); }, 3000);
        }
        catch(err){
            console.log(err);
            setSubmitState(2);
            setTimeout(() => { setSubmitState(0); }, 3000);
        }
    }
    useEffect(()=>{
        setFormData({
            Firstname: {
                value:authCtx.userInfo.firstname,
                isValid:true,
            },
            Lastname: {
                value:authCtx.userInfo.lastname,
                isValid:true,
            },
            PhoneNumber: {
                value:authCtx.userInfo.phone,
                isValid:true,
            },
            Username: {
                value:authCtx.userInfo.username,
                isValid:true,
            },
            Displayname: {
                value:authCtx.userInfo.display_name,
                isValid:true,
            }
        },true)
    },[authCtx.userInfo.firstname])
    return (
        <>
        {submitState==1&&<Toast type='success' title='สำเร็จ' description='ข้อมูลส่วนตัวของคุณได้ถูกเปลี่ยนแปลงแล้ว' icon={successIcon}/>}
        {submitState==2&&<Toast type='fail' title='ผิดพลาด' description='เปลี่ยนข้อมูลส่วนตัวของคุณไม่สำเร็จ' icon={successIcon}/>}
        {authCtx.userInfo.firstname && 
        <Container>
            <Form>
                <Title>Edit Profile</Title>
                <Input
                type="text"
                id="Firstname"
                label="Firstname"
                errorText="Your firstname should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.firstname}
                initialValid={true}></Input>
                <Input
                type="text"
                id="Lastname"
                label="Lastname"
                errorText="Your lastname should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.lastname}
                initialValid={true}>
                </Input>
                <Input
                type="text"
                id="PhoneNumber"
                label="Phone Number"
                errorText="Your phone should be in this following format 0xxxxxxxxx"
                onInput={inputHandler}
                validator={[VALIDATOR_PHONE()]}
                initialValue={authCtx.userInfo.phone}
                initialValid={true}>                    
                </Input>
                <Input
                type="text"
                id="Username"
                label="Username"
                errorText="Your username should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.username}
                initialValid={true}> 
                </Input>
                <Input
                type="text"
                id="Displayname"
                label="Display Name"
                errorText="Your display name should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.display_name}
                initialValid={true}
                ></Input>
                <SubmitButton onClick={formSubmitHandler} disabled={!formState.isValid}>
                    Save
                </SubmitButton>
            </Form>
        </Container>
        }
        {!authCtx.userInfo && <div>...Loading</div>}
        </>
    )
}
export default EditProfilePage;