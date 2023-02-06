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
const InputField= ()=>{
    const Input = tw.input`border-[#E68BBE] border-[5px] rounded-[10px]`
    return (
        <div></div>
    )
}
export default LoginForm;