import tw from "twin.macro"
import ProgressBar from "./ProgressBar"
import Input from "../share/Input"
import GoogleIcon from "../../assets/GoogleIcon.svg"
import { useReducer } from "react"
import { VALIDATOR_MATCH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../share/Validator"
import {Link} from "react-router-dom"
const styles = {
    container:()=>[
        tw`flex flex-col font-inter items-center w-[50%] max-w-[460px] h-fit drop-shadow border-[1px] rounded-[30px] px-[3%] py-[1%]`,
    ],
    content: () => [
        tw`flex flex-col box-border h-full w-full items-center px-[2%] gap-y-[10px]`,
      ],
    title: () => [
        tw`text-[48px] font-bold`
    ],
    show: ({showState, nowState}) => [
        !(showState&(1<<(nowState-1))) && tw`hidden`,
        tw`w-full`
    ],
    button: () => [
        tw`w-full bg-[#D62B70] font-bold text-[20px] text-white rounded-[10px] font-inter p-[1%] mt-[4%] disabled:bg-gray-600`,
    ],
    or: () => [tw`my-[2%] text-center`],
    googleButton: () => [
        tw`flex flex-row justify-center items-center gap-x-[10px] w-full border-[#D62B70] border-[3px] text-[20px] text-[#D62B70] rounded-[10px] font-inter font-bold p-[1%]`,
      ],
    googleLogo: () => [
        tw`h-7`
    ],
    loginLink: () => [tw`text-[16px] font-inter text-[#D62B70] p-[1%] text-center`],
    checkbox: () => [
        tw`flex flex-row items-center text-[14px] gap-x-[10px]`
    ],
    box:() => [
        tw``
    ]
}
function reducer(state, action){
    if(action.type=='CHANGESTATE'){
        return {
            value: action.value
        }
    }
}
const RegisterForm = ()=>{
    const [state, dispatch] = useReducer(reducer, {value:1});
    const onChangeStateHandler = (value)=>{
        dispatch({type:'CHANGESTATE', value:value})
    };
    const continueHandler = ()=>{
        console.log(state.value);
        dispatch({type:'CHANGESTATE', value:state.value+1});
    }
    return (
        <div css={styles.container()}>
            <div css={styles.content()}>
                <div css={styles.title()}>Sign Up</div>
                <ProgressBar onClick={onChangeStateHandler} state={state.value}/>
                <div css={styles.show({showState:1, nowState:state.value})}>
                    <Input  
                    type="text" 
                    id="Firstname" 
                    label="Firstname" 
                    placeholder="Enter first name"  
                    errorText="Your first name should not be blank"
                    validator={[VALIDATOR_REQUIRE()]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:1, nowState:state.value})}>
                    <Input
                    type="text"
                    id="Lastname"
                    label="Lastname"
                    placeholder="Enter last name"
                    errorText="Your last name should not be blank"
                    validator={[VALIDATOR_REQUIRE()]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:1, nowState:state.value})}>
                    <Input
                    type="tel"
                    id="Phonenumber"
                    label="Phone Number"
                    placeholder="0xx-xxx-xxx"
                    errorText="Your phone should be in this format 0xx-xxx-xxx "
                    validator={[VALIDATOR_REQUIRE()]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:2, nowState:state.value})}>
                    <Input  
                    type="text" 
                    id="Username" 
                    label="Username" 
                    placeholder="Enter username"  
                    errorText="Your username should not be blank"
                    validator={[VALIDATOR_REQUIRE()]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:2, nowState:state.value})}>
                    <Input
                    type="password"
                    id="Password"
                    label="Password"
                    placeholder="Enter password"
                    errorText="Your password should not be at least 6 characters"
                    validator={[VALIDATOR_MINLENGTH(8)]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:2, nowState:state.value})}>
                    <Input
                    type="password"
                    id="ConfirmPW"
                    label="Confirm password"
                    placeholder="Enter password"
                    errorText="Your password did not match"
                    validator={[VALIDATOR_MATCH('MATCH')]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:4, nowState:state.value})}>
                    <Input
                    type="text"
                    id="Displayname"
                    label="Display name"
                    placeholder="Enter display name"
                    errorText="Your display name should not be blank"
                    validator={[VALIDATOR_REQUIRE()]}
                    onInput={()=>{console.log("DEMO")}}/>
                </div>
                <div css={styles.show({showState:3, nowState:state.value})}>
                    <button css={styles.button()}   onClick={continueHandler} >Continue</button>
                </div>
                <div css={[styles.or(), styles.show({showState:1, nowState:state.value})]}>OR</div>
                <button css={[styles.googleButton(), styles.show({showState:1, nowState:state.value})]} disabled={true}>
                    <img css={styles.googleLogo()} src={GoogleIcon} />
                    Sign up with Google
                </button>
                <Link css={[styles.loginLink(),styles.show({showState:1, nowState:state.value})]} to="/home">
                    Already have an account? Login
                </Link>
                <div css={[styles.checkbox(), styles.show({showState:4, nowState:state.value})]}>
                    <input css={styles.box()} type="checkbox" id="privacy" name="privacy"></input>
                    <label htmlFor="privacy">I agree to <b>Terms of Service</b> and <b>Privacy Policy</b>.</label>
                </div>
            </div>
        </div>
    )
}
export default RegisterForm