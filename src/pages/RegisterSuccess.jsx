import tw from "twin.macro"
import Logo from "../assets/logo.svg"
import RegisterSuccessCard from "../components/share/RegiterSuccessCard"
const styles = {
    container:()=>[
        tw`flex flex-col min-h-[95vh]`
    ],
    logo:()=>[
        tw`my-[1%] w-[10%] box-border self-center`
    ],
}
const RegisterSuccessPage = ()=> {
    return (
        <div css={styles.container()}>
            <img css={styles.logo()} src={Logo} />
            <RegisterSuccessCard/>
        </div>
    )
}
export default RegisterSuccessPage;