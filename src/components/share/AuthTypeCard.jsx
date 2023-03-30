import tw, {styled} from "twin.macro"
const Container = styled.div(()=>[
    tw`flex box-border rounded-[20px] border-2 border-black w-full ip8:w-[250px] dt:max-w-full dt:w-2/5 flex-row 
    dt:flex-col shadow-inherit dt:relative dt:h-[450px] items-center justify-between px-4 hover:border-[#D62B70] pf:w-1/4`
]);
const Type = styled.div(()=>[
    tw`font-ibm font-bold text-mobile-h2 dt:text-desktop-h2 dt:text-center my-4 dt:text-2xl`
])
const Avatar = styled.img(()=>[
    tw`dt:absolute dt:left-[50%] dt:translate-x-[-50%] dt:bottom-[-10%] h-[50px] dt:h-full`
])
const AuthTypeCard=({text, avatar, onClick})=>{
    return (
        <Container onClick={onClick}>
            <Type>{text}</Type>
            <Avatar src={avatar}/>
        </Container>
    )
}

export default AuthTypeCard;