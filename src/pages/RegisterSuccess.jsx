import { useLocation } from "react-router-dom"
import tw from "twin.macro"
import Logo from "../assets/logo.svg"
import RegisterSuccessCard from "../components/share/RegiterSuccessCard"
const styles = {
    container:(mid)=>[
        tw`flex flex-col min-h-[95vh] items-end px-16 w-full justify-center`,
        mid && tw`items-center`,
    ],
    logo:()=>[
        tw`my-[1%] w-[10%] box-border self-center`
    ],
}
const RegisterSuccessPage = ()=> {
    const location = useLocation();
    console.log(location.state);
    return (
        <div css={styles.container(location.state ? location.state.mid : null)}>
            {/* <img css={styles.logo()} src={Logo} /> */}
            {!location.state ? <RegisterSuccessCard /> : <RegisterSuccessCard text={location.state.text}/>}
        </div>
    )
}
export default RegisterSuccessPage;