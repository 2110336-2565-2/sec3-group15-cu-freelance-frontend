import tw from "twin.macro"
import Input from "../components/share/Input";
import lockIcon from "../assets/LockIcon.svg"
import { VALIDATOR_MINLENGTH, VALIDATOR_MATCH } from "../components/share/Validate";
import { useForm } from "../hooks/form-hook";
const Container = tw.div`flex justify-center pt-[20vh] min-h-[95vh] mb-4`;
const Form = tw.form`flex flex-col shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 py-4 rounded-[20px] gap-y-2 w-[420px] h-fit`;
const Title = tw.div`text-center font-bold text-xl dt:text-3xl`;
const LockIcon = tw.img`mx-auto mt-4`;
const Caution = tw.div`text-center font-bold text-xs dt:text-sm font-inter my-4`;
const SubmitButton = tw.button`bg-[#D62B70] text-center m-2 text-white font-inter font-bold rounded-[10px] p-2`;
const CancelButton = tw.button`text-[#D62B70] font-medium font-inter p-2`;
const ChangePasswordPage = ()=>{
    const [formState, inputHandler, setFormData] = useForm({
        Current: {
            value:"",
            isValid:false,
        },
        New: {
            value:"",
            isValid:false,
        },
        Confirm: {
            value:"",
            isValid:false,
        },
    },false
    )
    const formSubmitHandler = async(event)=>{
        event.preventDefault();
        const { Current, New, Confirm} =
                formState.inputs;
        console.log("button click!")
        try{
            console.log("button click!")
            console.log(Current.value, New, Confirm)
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <Container>
            <Form>
                <Title>Change Password</Title>
                <LockIcon src={lockIcon}></LockIcon>
                <Caution>make sure you remember your password</Caution>
                <Input
                type="password"
                id="Current"
                label="Current Password"
                errorText=""
                onInput={inputHandler}
                placeholder="Enter password"
                validator={[]}
                />
                <Input
                type="password"
                id="New"
                label="New Password"
                errorText="Your password should be at least 8 characters"
                onInput={inputHandler}
                placeholder="Enter password"
                validator={[VALIDATOR_MINLENGTH(8)]}
                />
                <Input
                type="password"
                id="Confirm"
                label="Confirm Password"
                errorText="Your password did not match"
                onInput={inputHandler}
                placeholder="Enter password"
                validator={[VALIDATOR_MATCH(formState.inputs.New.value)]}
                />
                <SubmitButton onClick={formSubmitHandler} disabled={!formState.isValid}>Change Password</SubmitButton>
                <CancelButton>Cancel</CancelButton>
            </Form>
        </Container>
    )
}
export default ChangePasswordPage;