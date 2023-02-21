import tw from "twin.macro"
import Input from "../components/share/Input"
import { useForm } from "../hooks/form-hook"
import { VALIDATOR_PHONE, VALIDATOR_REQUIRE } from "../components/share/Validate";
import { apiClient } from "../utils/axios";
const Container = tw.div`px-[30rem] py-[20vh] min-h-[95vh] `;
const Form = tw.form`flex flex-col shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 py-4 rounded-[20px] gap-y-2 max-w-[420px] mx-auto`;
const Title = tw.div`text-center font-bold text-3xl`;
const SubmitButton = tw.button`bg-[#D62B70] text-center m-2 text-white font-inter font-bold rounded-[10px] p-2 text-xl`;
const EditProfilePage = ()=> {
    const [formState, inputHandler] = useForm({
        Firstname: {
            value:"",
            isValid:false,
        },
        Lastname: {
            value:"",
            isValid:false,
        },
        PhoneNumber: {
            value:"",
            isValid:false,
        },
        Username: {
            value:"",
            isValid:false,
        },
        Displayname: {
            value:"",
            isValid:false,
        }
    },true
    )
    const formSubmitHandler = async(event)=>{
        console.log("test-button")
        event.preventDefault();
        const { Firstname, Lastname, PhoneNumber, Username, Displayname} =
                formState.inputs;
        try{
            let data = JSON.stringify({
                display_name: Displayname.value,
                firstname: Firstname.value,
                lastname: Lastname.value,
                phone: PhoneNumber.value
              });
            const response = await apiClient.patch(`/user/`, data, {
                headers: { "Content-Type": "application/json" },
            });
            console.log(response.data)
        }
        catch(err){
            console.log(err);
        }
    }
    console.log(formState.isValid);
    return (
        <Container>
            <Form>
                <Title>Edit Profile</Title>
                <Input
                type="text"
                id="Firstname"
                label="Firstname"
                errorText="Your firstname should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}></Input>
                <Input
                type="text"
                id="Lastname"
                label="Lastname"
                errorText="Your lastname should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}>
                </Input>
                <Input
                type="text"
                id="PhoneNumber"
                label="Phone Number"
                errorText="Your phone should be in this following format 0xxxxxxxxx"
                onInput={inputHandler}
                validator={[VALIDATOR_PHONE()]}>                    
                </Input>
                <Input
                type="text"
                id="Username"
                label="Username"
                errorText="Your username should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}> 
                </Input>
                <Input
                type="text"
                id="Displayname"
                label="Display Name"
                errorText="Your display name should not be blank"
                onInput={inputHandler}
                validator={[VALIDATOR_REQUIRE()]}
                ></Input>
                <SubmitButton onClick={formSubmitHandler} disabled={!formState.isValid}>
                    Save
                </SubmitButton>
            </Form>
        </Container>
    )
}
export default EditProfilePage;