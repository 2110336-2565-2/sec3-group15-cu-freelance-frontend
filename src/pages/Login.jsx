import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginTypeCard from "../components/share/LoginTypeCard"
import CustomerAvatar from "../assets/CustomerAvatar.svg"
import FreelanceAvatar from "../assets/FreelanceAvatar.svg"
import {useNavigate } from "react-router-dom"
import AuthLayout from "../components/share/AuthLayout"
const styles={
    container:()=>[
        tw`flex flex-col items-center pt-[0.5%] h-[95vh] box-border`
    ],
    image:()=>[
        tw`my-[1%] w-[10%] box-border`
    ],
    text:()=>[
        tw`text-[40px] text-[#D62B70] font-bold font-inter mb-[2%] box-border`
    ],
    typeContainer:()=>[
        tw`flex flex-row px-[10%] w-[100vw] box-border justify-between h-[48vh]`
    ]
}
const Login=()=>{
    return (
        <AuthLayout
            title="Login"
            leftText="ล็อคอินเป็นผู้รับจ้าง"
            rightText="ล็อคอินเป็นฟรีแลนซ์"
            navigateLeft="/login/customer"
            navigateRight="/login/freelance"
        />
    )
}

export default Login;