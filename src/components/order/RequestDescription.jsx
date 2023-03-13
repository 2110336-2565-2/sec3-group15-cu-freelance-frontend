import tw, {styled} from "twin.macro"
import CheckIcon from "../../assets/CheckIconFull.svg"
const Container = styled.div(({})=>[
    tw`flex flex-col m-auto justify-between gap-y-4`
])
const IconSection = styled.div(({})=>[
    tw`flex flex-col items-center`
])
const Icon = styled.img(({})=>[
    tw`w-8 h-8`
])
const IconDesc = styled.div(({})=>[
    tw`font-sans font-bold text-mobile-small`
])
const Title = styled.div(({})=>[
  tw`font-bold font-ibm text-freelance-black-primary text-mobile-h1 text-center`  
])
const Desc = styled.div(({})=>[
    tw`font-normal font-ibm text-freelance-black-secondary text-mobile-body text-center`
])
const RequestDescription = ({icon=CheckIcon, iconDesc="สำเร็จ", title, desc})=> {
    console.log(title, desc)
    return (
        <Container>
            <IconSection>
               <Icon src={icon}/>
               <IconDesc>{iconDesc}</IconDesc> 
            </IconSection>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
        </Container>
    )
}
export default RequestDescription;