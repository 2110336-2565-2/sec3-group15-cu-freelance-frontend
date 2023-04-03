import tw from "twin.macro"
import RegisterCustomerAvatar from "../assets/LoginCustomerAvatar.svg"
import RegisterForm from "../components/register/RegisterForm.jsx"
import LogoButton from "../components/share/LogoButton"

const AvatarImg = tw.img`hidden dt:block object-contain self-center`
const Wrapper = tw.div`flex flex-col justify-between items-center min-h-[95vh] max-w-[1200px] mx-auto gap-y-4`
const Content = tw.div`flex flex-row justify-around items-center w-[95%] bg-white`
const DummyDiv = tw.div``

const Avatar = () => {
    return <img src={RegisterCustomerAvatar} alt="Avatar image" tw="hidden dt:block" />
}
const RegisterPage=()=>{
    return (
        <Wrapper>
            <div tw="mt-2">
                <LogoButton/>
            </div>
           <Content>
                <Avatar/>
                <RegisterForm/>
            </Content>
            <DummyDiv/>
        </Wrapper>
    )
}

export default RegisterPage