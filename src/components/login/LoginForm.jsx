import tw from "twin.macro"
import Card from "../share/Card"
import Input from "../share/Input"
import { VALIDATOR_REQUIRE } from "../share/validator"
const styles = {
   container:()=>[
    tw`flex flex-col font-inter items-center`
   ],
   header:()=>[
    tw`text-[48px] font-bold text-[#D62B70]`
   ],
   form:()=>[
    // tw`text-[#E68BBE] flex flex-col [> input]:(border-black)`
   ]
}
const LoginForm = ()=>{
    return (
    <Card type='loginForm'>
        <div css={styles.container()}>
            <div css={styles.header()}>Login</div>
            <form css={styles.form()}>
                <Input
                id="uname"
                element="input"
                label="Username/Email"
                validator={[VALIDATOR_REQUIRE()]}
                errorText="Please enter Username/Email"/>
            </form>
        </div>
    </Card>
)
    }
export default LoginForm;