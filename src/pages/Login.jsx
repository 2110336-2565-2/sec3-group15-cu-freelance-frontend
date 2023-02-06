import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
const styles={
    container:()=>[
        tw`flex flex-col items-center mt-[2%]`
    ],
    image:()=>[
        // tw`pt-[1%]`
    ]
}
const LoginPage=()=>{

    return (
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
            <LoginForm/>
        </div>
    )
}

export default LoginPage