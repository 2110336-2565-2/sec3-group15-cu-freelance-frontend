import tw, {styled} from "twin.macro"
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
import Button from "../components/share/Button";
import { Navigate, useNavigate } from "react-router-dom";
import MenuList from "../components/userSetting/MenuList";
import { useWindow } from "../hooks/window-hook";
const Container = tw.div`flex justify-center pt-[10vh] dt:pt-[20vh] min-h-[95vh] w-3/4 dt:w-full m-auto mb-2`;
const Form = tw.form`flex flex-col dt:shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 py-4 rounded-[20px] gap-y-2 w-[420px] h-fit pf:w-1/4 pf:gap-y-4`;
const Title = tw.div`text-center font-bold text-xl dt:text-3xl font-ibm`;
const ButtonSection = tw.div`flex flex-row justify-between mt-2`;
const FileUploadButton = tw.label`font-ibm text-center w-full bg-freelance-pink 
                                  text-white rounded-[20px] py-2 text-mobile-body dt:text-desktop-base
                                  hover:cursor-pointer`;
const FileUploadInput = tw.input`w-full hidden`
const ProfileImage = tw.img`rounded-full mx-auto w-[100px] h-[100px] dt:w-[128px] dt:h-[128px] overflow-hidden object-fill my-2`
const EditProfilePage = ()=> {
    const authCtx=useContext(AuthContext);
    const [submitState, setSubmitState] = useState(0);
    const [isClear, setIsClear] = useState(0);
    const [selectedProfile, SetSelectedProfile] = useState(null);
    const [previewProfile, SetPreviewProfile] = useState(null);
    const profileChangeHandler=(event)=>{
        event.preventDefault();
        SetSelectedProfile(event.target.files[0]);
        SetPreviewProfile(URL.createObjectURL(event.target.files[0]));
    }
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
        // Username: {
        //     value:"",
        //     isValid:true,
        // },
        Displayname: {
            value:"",
            isValid:true,
        }
    },true
    )
    const navigate = useNavigate();
    const windowSize = useWindow();
    useEffect(()=>{
        if(windowSize>=850){
            navigate('/user-setting-entrance-dt');
        }
    },[windowSize])
    const backHandler = ()=>{
        navigate('/user-setting-entrance');
    }
    const clearHandler = (event) => {
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
            // Username: {
            //     value:authCtx.userInfo.username,
            //     isValid:true,
            // },
            Displayname: {
                value:authCtx.userInfo.display_name,
                isValid:true,
            }
        },true)
        setIsClear(1);
    }
    useEffect(()=>{
        if(isClear==1){
            setIsClear(0);
        }
    },[isClear])
    const formSubmitHandler = async(event)=>{
        // event.preventDefault();
        const { Firstname, Lastname, PhoneNumber, Displayname} =
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
            console.log('form response', response);
            const formData = new FormData();
            formData.append("file", selectedProfile);
            console.log(selectedProfile)
            const fileResponse = await apiClient.put(`/file/avatar`, formData);
            console.log(fileResponse);
            setSubmitState(1);
            setTimeout(() => { setSubmitState(0); }, 3000);
        }
        catch(err){
            console.log(err);
            setSubmitState(2);
            setTimeout(() => { setSubmitState(0); }, 3000);
        }
        setTimeout(() => { setSubmitState(0); }, 3000);
        // navigate(0);
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
            // Username: {
            //     value:authCtx.userInfo.username,
            //     isValid:true,
            // },
            Displayname: {
                value:authCtx.userInfo.display_name,
                isValid:true,
            }
        },true)
    },[authCtx.userInfo.firstname])
    console.log(formState.isValid);
    return (
        <>
        {submitState==1&&<Toast type='success' title='สำเร็จ' description='ข้อมูลส่วนตัวของคุณได้ถูกเปลี่ยนแปลงแล้ว' icon={successIcon}/>}
        {submitState==2&&<Toast type='fail' title='ผิดพลาด' description='เปลี่ยนข้อมูลส่วนตัวของคุณไม่สำเร็จ' icon={successIcon}/>}
        {/* <MenuList state={0}/> */}
        {authCtx.userInfo.firstname && 
        <Container>
            {!isClear&&<Form>
                <Title>แก้ไขข้อมูลส่วนตัว</Title>
                <ProfileImage src={previewProfile}>
                    {/* <img src={previewProfile}/> */}
                </ProfileImage>
                <FileUploadButton>
                    <FileUploadInput type='file' onChange={profileChangeHandler}/>
                    เปลี่ยนรูปโปรไฟล์
                </FileUploadButton>
                <Input
                type="text"
                id="Firstname"
                label="ชื่อ"
                errorText="ชื่อของคุณไม่ควรว่างเปล่า"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.firstname}
                initialValid={true}></Input>
                <Input
                type="text"
                id="Lastname"
                label="นามสกุล"
                errorText="นามสกุลของคุณไม่ควรว่างเปล่า"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.lastname}
                initialValid={true}>
                </Input>
                <Input
                type="text"
                id="PhoneNumber"
                label="เบอร์โทรศัพท์"
                errorText="เบอร์โทรของคุณควรอยู่ในรูปแบบ 0xxxxxxxxx"
                onInput={inputHandler}
                validator={[VALIDATOR_PHONE()]}
                initialValue={authCtx.userInfo.phone}
                initialValid={true}>                    
                </Input>
                {/* <Input
                type="text"
                id="Username"
                label="Username"
                errorText="Your username should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.username}
                initialValid={true}> 
                </Input> */}
                <Input
                type="text"
                id="Displayname"
                label="ชื่อที่ใช้แสดง"
                errorText="ชื่อที่ใช้แสดงไม่ควรว่างเปล่า"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                initialValue={authCtx.userInfo.display_name}
                initialValid={true}
                ></Input>
                <ButtonSection>
                    <Button onClick={windowSize>=850 ? clearHandler : backHandler} secondary width={'45%'}>
                        {windowSize >= 850 ? 'ล้าง' : 'ย้อนกลับ'}
                    </Button>
                    <Button onClick={formSubmitHandler} primary width={'45%'} disable={!formState.isValid}>
                        บันทึก
                    </Button>
                </ButtonSection>
                
            </Form>}
        </Container>
        }
        {!authCtx.userInfo && <div>...Loading</div>}
        </>
    )
}
export default EditProfilePage;