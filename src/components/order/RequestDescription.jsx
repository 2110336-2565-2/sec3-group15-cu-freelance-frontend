import tw, {styled} from "twin.macro"
import CheckIcon from "../../assets/CheckIconFull.svg"
const Container = styled.div(({})=>[
    tw`flex flex-col m-auto justify-between gap-y-4`
])
const Success = styled.div(({})=>[
    tw`flex flex-col items-center`
])
const Icon = styled.img(({})=>[
    tw`w-8 h-8`
])
const SuccessText = styled.div(({})=>[
    tw`font-sans font-bold text-mobile-small`
])
const Title = styled.div(({})=>[
  tw`font-bold font-ibm text-freelance-black-primary text-mobile-h1 text-center`  
])
const Desc = styled.div(({})=>[
    tw`font-normal font-ibm text-freelance-black-secondary text-mobile-body text-center`
])
const RequestDescription = ({title, desc})=> {
    console.log(title, desc)
    return (
        <Container>
            <Success>
               <Icon src={CheckIcon}/>
               <SuccessText>สำเร็จ</SuccessText> 
            </Success>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
        </Container>
    )
}
export default RequestDescription;