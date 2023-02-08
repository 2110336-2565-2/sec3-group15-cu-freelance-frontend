import Logo from "../assets/logo.svg"
import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
const styles={
    container:()=>[
<<<<<<< HEAD
        tw`flex flex-col items-center pt-[1%] h-[95vh]`
=======
        tw`flex flex-col items-center h-[95vh]`
>>>>>>> origin
    ],
    image:()=>[
        tw`my-[1%]`
    ]
}
const Login=()=>{
    return (
        <div css={styles.container}>
            <img css={styles.image} src={Logo}/>
        </div>
    )
}

export default Login;