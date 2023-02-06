import tw from "twin.macro"
import Card from "../share/Card"
const styles = {
   container:()=>[
    tw`flex flex-col font-inter`
   ],
   header:()=>[
    tw`text-[48px] font-bold`
   ]
}
const LoginForm = ()=>(
    <Card css={styles.container}type='loginForm'>
        <div css={styles.header()}>Login</div>
    </Card>
)
export default LoginForm;