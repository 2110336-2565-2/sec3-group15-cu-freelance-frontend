import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
import LoginCustomerAvatar from "../assets/LoginCustomerAvatar.svg"
const styles={
    container:()=>[
        tw`flex flex-col items-center pt-[0.5%] h-[95vh] box-border max-w-[1400px] mx-auto`
    ],
    logo:()=>[
        tw`my-[1%] w-[10%] box-border`
    ],
    content:()=>[
        tw`w-full h-full flex flex-row items-center justify-between pl-[10%] pr-[6%]`
    ],
    avatar:()=>[
        tw``
    ]
}
const LoginCustomer=()=>{
    return (
        <div css={styles.container}>
            <img css={styles.logo} src={Logo}/>
            <div css={styles.content}>
                <img css={styles.avatar} src={LoginCustomerAvatar}/>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginCustomer;