import tw, { styled } from "twin.macro";
import Input from "../share/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../share/Validate";
const Container = styled.div(({ show }) => [
  tw`place-self-start w-full gap-y-2 mb-2`,
  !show && tw`hidden`,
]);
const CreateOrder3 = ({
  inputHandler3,
  show = true,
  initialValue,
  initialValid = false,
}) => {
  return (
    <Container show={show}>
      <Input
        type="text"
        id="email"
        label="อีเมล"
        placeholder="ใส่อีเมลที่นี่..."
        errorText="ตัวอย่างอีเมลที่ถูกต้อง: Example@Example.com"
        initialValue={initialValue ? initialValue.email : null}
        initialValid={initialValid}
        validator={[VALIDATOR_EMAIL()]}
        onInput={inputHandler3}
        required
      />
      <Input
        type="text"
        id="phone"
        label="เบอร์โทรศัพท์"
        placeholder="ใส่เบอร์โทรศัพท์ที่นี่"
        errorText="เบอร์โทรศัพท์ควรอยู่ในรูปแบบ 0xxxxxxxxx"
        initialValue={initialValue ? initialValue.tel : null}
        initialValid={initialValid}
        validator={[VALIDATOR_PHONE()]}
        onInput={inputHandler3}
        required
      />
    </Container>
  );
};
export default CreateOrder3;
