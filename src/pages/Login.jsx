import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginTypeCard from "../components/share/LoginTypeCard"
import CustomerAvatar from "../assets/CustomerAvatar.svg"
import FreelanceAvatar from "../assets/FreelanceAvatar.svg"
<<<<<<< HEAD
import { useActionData, useNavigate } from "react-router-dom"
import { APP_URL, SSO_URL } from "../config/env"
||||||| 278c97f
import { useActionData, useNavigate } from "react-router-dom"
=======
import {useNavigate } from "react-router-dom"
import AuthLayout from "../components/share/AuthLayout"
>>>>>>> 1cc4200d7aef500c13ebf934e64f69b7461abc6b
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
<<<<<<< HEAD
    const navigate=useNavigate()
    const onLoginHandler=()=>{
        navigate('/login/customer')
    }
    const onFreelanceLoginHandler=()=>{
        window.location.href=`${SSO_URL}/login?service=${APP_URL}/auth`
    }
||||||| 278c97f
    const navigate=useNavigate()
    const onLoginHandler=()=>{
        navigate('/login/customer')
    }
=======
>>>>>>> 1cc4200d7aef500c13ebf934e64f69b7461abc6b
    return (
<<<<<<< HEAD
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
            <div css={styles.text}>Login</div>
            <div css={styles.typeContainer}>
                <LoginTypeCard text="ล็อคอินเป็นผู้รับจ้าง" avatar={CustomerAvatar} type='left' onClick={onLoginHandler}/>
                <LoginTypeCard text="ล็อคอินเป็นฟรีแลนซ์" avatar={FreelanceAvatar} type='right' onClick={onFreelanceLoginHandler}/>
            </div>
        </div>
||||||| 278c97f
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
            <div css={styles.text}>Login</div>
            <div css={styles.typeContainer}>
                <LoginTypeCard text="ล็อคอินเป็นผู้รับจ้าง" avatar={CustomerAvatar} type='left' onClick={onLoginHandler}/>
                <LoginTypeCard text="ล็อคอินเป็นฟรีแลนซ์" avatar={FreelanceAvatar} type='right' onClick={onLoginHandler}/>
            </div>
        </div>
=======
        <AuthLayout
            title="Login"
            leftText="ล็อคอินเป็นผู้รับจ้าง"
            rightText="ล็อคอินเป็นฟรีแลนซ์"
            navigateLeft="/login/customer"
            navigateRight="/login/freelance"
        />
>>>>>>> 1cc4200d7aef500c13ebf934e64f69b7461abc6b
    )
}

export default Login;