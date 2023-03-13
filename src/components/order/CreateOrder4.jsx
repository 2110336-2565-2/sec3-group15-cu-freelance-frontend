import tw, {styled} from "twin.macro";
import React, {Component} from 'react';
const Container = styled.div(({show})=>[
    tw`self-center w-full flex flex-col gap-y-2 mb-2`,
    !show && tw`hidden`
]);
const Label = styled.div(()=>[
    tw`font-ibm font-semibold text-mobile-h2 text-freelance-black-primary`
])
const Content = styled.div(()=>[
    tw`font-ibm font-normal text-mobile-body text-freelance-black-secondary`
])
const label = ["หัวข้องาน", "รายละเอียดงาน", "ราคา", "ระยะเวลา", "อีเมล", "เบอร์โทรศัพท์"]
const CreateOrder4 = (props)=>{
    const {topic, desc, price, duration, email, phone, show} = props;
    return (
        <Container show={show}>
            {Object.keys(props).map((key, idx) => (
                <div key={idx}>
                    <Label>{label[idx]}</Label>
                    <Content>{props[key]}</Content>
                </div>
            ))}
        </Container>
    )
}
export default CreateOrder4;