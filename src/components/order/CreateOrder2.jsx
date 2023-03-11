import tw, {styled} from "twin.macro";
import Input from "../share/Input";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import { VALIDATOR_PRICE } from "../share/Validate";
import { DUMMY_duration_options } from "../../store/portfolioForm";
const Container = styled.div(({show})=>[
    tw`place-self-start w-full`,
    !show && tw`hidden`
]);
const CreateOrder2 = ({inputHandler2, show=true})=>{
    return (
        <Container show={show}>
            <Input 
            type="text"
            id="price"
            label="ราคา(บาท)"
            placeholder="ใส่ราคาที่นี่..."
            errorText="ราคาควรประกอบด้วยตัวเลข0-9และไม่ควรมีค่าน้อยกว่าเท่ากับ0"
            validator={[VALIDATOR_PRICE()]}
            onInput={inputHandler2}
            required/>
            <Input 
            type="select"
            id="duration"
            label="ระยะเวลา"
            errorText="กรุณาเลือก 1 รายการ"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler2}
            required
            options={DUMMY_duration_options}/>
        </Container>
    )
}
export default CreateOrder2;