import tw, {styled} from "twin.macro"
import { useWindow } from "../../hooks/window-hook";
import React from "react";
const Container = styled.div(()=>[
    tw`flex box-border rounded-[20px] border-2 border-black/10 w-full ip8:min-w-[280px] 
    dt:min-w-[375px] dt:w-[65%] flex-row min-h-[100px]
    dt:flex-col shadow-inherit dt:relative dt:h-[450px] items-center justify-between px-4
    hover:border-[#D62B70] hover:cursor-pointer`
]);
const Type = styled.div(()=>[
    tw`font-ibm font-semibold text-mobile-h1 dt:text-center my-4 dt:text-2xl`
])
const Avatar = styled.img(()=>[
    tw`dt:absolute dt:left-[50%] dt:translate-x-[-50%] dt:bottom-[-10%] h-[50px] dt:h-full`
])
const AuthTypeCard=({text, avatar, onClick})=>{
    const windowSize = useWindow();
    return (
        <Container onClick={onClick}>
            {/* {windowSize >=550 ?
            <>
            <Type>{text}</Type>
            <Avatar src={avatar}/>
            </>
            :
            <>
            <Avatar src={avatar}/>
            <Type>{text}</Type>
            </>
        } */}
            <>
            <Type>{text}</Type>
            <Avatar src={avatar}/>
            </>
        </Container>
    )
}

export default AuthTypeCard;