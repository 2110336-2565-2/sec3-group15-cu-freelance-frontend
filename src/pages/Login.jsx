import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginTypeCard from "../components/share/LoginTypeCard"
import CustomerAvatar from "../assets/CustomerAvatar.svg"
import FreelanceAvatar from "../assets/FreelanceAvatar.svg"
import { useActionData, useNavigate } from "react-router-dom"
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
=======

>>>>>>> origin
    return (
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
            <div css={styles.text}>Login</div>
            <div css={styles.typeContainer}>
                <LoginTypeCard text="ล็อคอินเป็นผู้รับจ้าง" avatar={CustomerAvatar} type='left' onClick={onLoginHandler}/>
                <LoginTypeCard text="ล็อคอินเป็นฟรีแลนซ์" avatar={FreelanceAvatar} type='right' onClick={onLoginHandler}/>
            </div>
        </div>
    )
}

export default Login;