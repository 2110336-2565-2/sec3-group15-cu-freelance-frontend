import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
const styles={
    container:()=>[
        tw`flex flex-col items-center pt-[1%] h-[95vh]`
    ],
    image:()=>[
        tw`mb-[1%]`
    ]
}
const LoginCustomer=()=>{
    return (
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
            <LoginForm/>
        </div>
    )
}

export default LoginCustomer;