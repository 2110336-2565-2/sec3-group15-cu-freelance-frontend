import tw from "twin.macro"
import LoginForm from "../components/login/LoginForm"
import LoginCustomerAvatar from "../assets/LoginCustomerAvatar.svg"
import LogoButton from "../components/share/LogoButton"

const Wrapper = tw.div`flex flex-col justify-between items-center h-[95vh] max-w-[1200px] mx-auto `
const Content = tw.div`flex flex-row justify-around items-center w-[95%] bg-white`
const DummyDiv = tw.div``
const Avatar = () => {
    return <img src={LoginCustomerAvatar} tw="hidden dt:block"/>
}
const LoginCustomer=()=>{
    return (
        <Wrapper>
            <div tw="mt-2">
                <LogoButton/>
            </div>
           <Content>
                <Avatar/>
                <LoginForm/>
            </Content>
            <DummyDiv/>
        </Wrapper>
    )
}

export default LoginCustomer;