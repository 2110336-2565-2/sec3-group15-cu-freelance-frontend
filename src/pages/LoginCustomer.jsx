import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
import LoginCustomerAvatar from "../assets/LoginCustomerAvatar.svg"
import LogoButton from "../components/share/LogoButton"
const styles={
    container:()=>[
        tw`flex flex-col items-center pt-[0.5%] min-h-[95vh] box-border max-w-[1400px] mx-auto`  
    ],
    content:()=>[
        tw`w-full h-full flex flex-row items-center mt-[10vh] justify-between pl-[10%] pr-[6%] items-center my-auto`
        
    ],
    avatar:()=>[
        tw``
    ]
}
const LoginCustomer=()=>{
    return (
        <div css={styles.container}>
           <LogoButton/>
            <div css={styles.content}>
                <img css={styles.avatar} src={LoginCustomerAvatar}/>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginCustomer;