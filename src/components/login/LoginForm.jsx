import tw from "twin.macro"
import Card from "../share/Card"
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
    const Input = tw.input`border-[#E68BBE] border-[5px] rounded-[10px]`
    return (
    <Card type='loginForm'>
        <div css={styles.container()}>
            <div css={styles.header()}>Login</div>
            <form css={styles.form()}>
                <label for="uname">Username/Email</label>
                <Input type="text" id="uname" name="uname"/>
                <label for="password">Password</label>
                <Input type="text" id="password" name="password"/>
            </form>
        </div>
    </Card>
)
    }
export default LoginForm;