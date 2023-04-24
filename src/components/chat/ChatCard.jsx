import tw, {styled} from "twin.macro"
import React from "react"
import CircleImage from "../share/CircleImage"
import defaultProfile from "../../assets/defaultProfile.svg"
const Container = styled.div(({selected})=>[
    tw`flex flex-row gap-x-2 items-center w-full py-2 hover:bg-gray-100`,
    selected && tw`bg-gray-200`
])
const Information = styled.div(()=>[
    tw`flex flex-col`
])
const CircleImageContainer = styled.div(()=>[
    tw`flex w-12 h-12`
])
const Name = styled.div(()=>[
    tw`font-ibm text-mobile-body dt:text-desktop-h2`
])
const LastMsg = styled.div(()=>[
    tw`font-ibm text-mobile-body dt:text-desktop-h2 text-freelance-black-secondary truncate max-w-[50vw]`
])
const ChatCard = ({name="test", lastMsg="test", profileImg={defaultProfile}, onClick, selected=false})=>{
    return (
        <>
        <Container onClick={onClick} selected={selected}>
            <CircleImageContainer>
                <CircleImage/>
            </CircleImageContainer>
            <Information>
                <Name>{name}</Name>
                <LastMsg>{lastMsg}</LastMsg>
            </Information>
        </Container>
        </>
    )
}
export default ChatCard;