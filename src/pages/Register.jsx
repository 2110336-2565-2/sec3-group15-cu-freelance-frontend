import tw from "twin.macro"
import RegisterCustomerAvatar from "../assets/LoginCustomerAvatar.svg"
import RegisterForm from "../components/register/RegisterForm.jsx"
import LogoButton from "../components/share/LogoButton"
const styles = {
    container:()=> [
        tw`flex flex-col items-center min-h-[95vh] max-w-[1400px] mx-auto`  
    ],
    logo: () => [
        tw`my-[1%] w-[10%] `
    ],
    content:()=>[
        tw`w-full h-full flex flex-row  justify-between mt-[10vh] pl-[10%] pr-[6%]`
    ],
    avatar:()=>[
        tw`object-contain self-center`
    ]
}
const RegisterPage=()=>{
    return (
        <div css={styles.container()}>
            <LogoButton/>
            <div css={styles.content()}>
                <img css={styles.avatar()} src={RegisterCustomerAvatar}/>
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage