import tw, {styled} from "twin.macro";
import Input from "../share/Input";
import { VALIDATOR_REQUIRE } from "../share/Validate";
const Container = styled.div(({show})=>[
    tw`place-self-start w-full`,
    !show && tw`hidden`
]);
const CreateOrder1 = ({inputHandler1, show=true})=>{
    console.log(show)
    return (
        <Container show={show}>
            <Input 
            type="text"
            id="topic"
            label="หัวข้องาน"
            placeholder="ใส่หัวข้องานที่นี่..."
            errorText="หัวข้องานไม่ควรเว้นว่าง"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
            required/>
            <Input 
            type="textarea"
            id="desc"
            label="รายละเอียดงาน"
            placeholder="ใส่รายละเอียดงานที่นี่..."
            errorText="รายละเอียดไม่ควรเว้นว่าง"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
            required
            rows={5}/>
        </Container>
    )
}
export default CreateOrder1;