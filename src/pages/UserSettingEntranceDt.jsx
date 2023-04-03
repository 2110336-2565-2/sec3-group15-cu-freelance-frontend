import tw, {styled} from "twin.macro"
import React from "react"
import MenuList from "../components/userSetting/MenuList"
import EditProfilePage from "./EditProfile"
import ChangePasswordPage from "./ChangePassword"
import { useState } from "react"
const UserSettingEntranceDtPage = ()=>{
    const [state, setState] = useState(0);
    // console.log(setState, 2);
    // console.log(state);
    return (
        <>
            <MenuList state={state} setState={setState}/>
            {!state ? <EditProfilePage/> : <ChangePasswordPage setState={setState}/>}
        </>
    )
}
export default UserSettingEntranceDtPage;