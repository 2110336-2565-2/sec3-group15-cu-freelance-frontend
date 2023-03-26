import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tw, {styled} from "twin.macro"

const Container = styled.div(()=>[
    tw`flex flex-col fixed invisible dt:visible top-1/4 gap-y-8 ml-4 wd:ml-32 pf:ml-64`
]);
const List = styled.div(({checkState, nowState})=>[
    tw`font-ibm font-bold text-xl text-freelance-black-primary hover:underline hover:cursor-pointer`,
    checkState==nowState && tw`underline`
]);
const MenuList = ({state})=>{
    const navigate = useNavigate();
    const onClickHandler = (path)=>{
        navigate(path);
    }
    return (
        <Container>
            <List onClick = {onClickHandler.bind(null,'/edit-profile')} checkState={0} nowState={state}>แก้ไขข้อมูลส่วนตัว</List>
            <List onClick = {onClickHandler.bind(null,'/edit-username')} checkState={1} nowState={state}>แก้ไขชื่อผู้ใช้</List>
            <List onClick = {onClickHandler.bind(null,'/change-password')} checkState={2} nowState={state}>เปลี่ยนรหัสผ่าน</List>
        </Container>
    )
}
export default MenuList;