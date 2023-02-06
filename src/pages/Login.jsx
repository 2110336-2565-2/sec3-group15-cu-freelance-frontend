import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
import Footer from "../components/share/Footer.jsx"
const styles={
    container:()=>[
        tw`flex flex-col items-center mt-[1%] h-[95vh]`
    ],
    image:()=>[
        tw`mb-[1%]`
    ]
}
const LoginPage=()=>{
    return (
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
            <LoginForm/>
            {/* <Footer/> */}
        </div>
    )
}

export default LoginPage