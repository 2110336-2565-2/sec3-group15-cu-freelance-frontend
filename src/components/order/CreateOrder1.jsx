import tw, {styled} from "twin.macro";
import Input from "../share/Input";
import { VALIDATOR_REQUIRE } from "../share/Validate";
const Container = styled.div(({show})=>[
    tw`place-self-start w-full gap-y-2 mb-2`,
    !show && tw`hidden`
]);
const CreateOrder1 = ({inputHandler1, show=true,initialValue,initialValid=false})=>{

    return (
        <Container show={show}>
            <Input 
            type="text"
            id="topic"
            label="หัวข้องาน"
            placeholder="ใส่หัวข้องานที่นี่..."
            errorText="หัวข้องานไม่ควรเว้นว่าง"
            initialValue={initialValue?initialValue.title:null}
            initialValid={initialValid}
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
            required/>
            <Input 
            type="textarea"
            id="desc"
            label="รายละเอียดงาน"
            placeholder="ใส่รายละเอียดงานที่นี่..."
            initialValue={initialValue?initialValue.description:null}
            initialValid={initialValid}
            errorText="รายละเอียดไม่ควรเว้นว่าง"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
            required
            rows={7}/>
        </Container>
    )
}
export default CreateOrder1;