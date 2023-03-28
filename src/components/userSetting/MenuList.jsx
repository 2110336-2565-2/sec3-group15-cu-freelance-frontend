import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tw, {styled} from "twin.macro"

const Container = styled.div(()=>[
    tw`flex flex-col fixed invisible tbl:visible top-1/4 gap-y-8 ml-4 wd:ml-32 pf:ml-64`
]);
const List = styled.div(({checkState, nowState})=>[
    tw`font-ibm font-bold dt:text-xl text-freelance-black-primary hover:underline hover:cursor-pointer`,
    checkState==nowState && tw`underline`
]);
const MenuList = ({state, setState})=>{
    const navigate = useNavigate();
    // console.log(setState);
    const onClickHandler = (state)=>{
        // console.log(state);
        setState(state)
        // navigate(path);
    }
    return (
        <Container>
            <List onClick = {onClickHandler.bind(null, 0)} checkState={0} nowState={state}>แก้ไขข้อมูลส่วนตัว</List>
            {/* <List onClick = {onClickHandler.bind(null,'/edit-username')} checkState={1} nowState={state}>แก้ไขชื่อผู้ใช้</List> */}
            <List onClick = {onClickHandler.bind(null, 2)} checkState={2} nowState={state}>เปลี่ยนรหัสผ่าน</List>
        </Container>
    )
}
export default MenuList;