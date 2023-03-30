import tw, {styled} from "twin.macro"
import React from "react"
import defaultProfile from "../../assets/DefaultProfile.svg"
const Container = styled.div(()=>[
    tw`relative w-full h-full`
])
const Image = styled.img(()=>[ 
    tw`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-full w-full h-full`
])
const CircleImage = ({image})=>{
    //How to use: Create Container with desire witdth and height (should be equal) in which 
    // this component will be contained
    return (
        <>
            <Container>
                <Image src={image ? image : defaultProfile}/>   
            </Container>
        </>
    )
}
export default CircleImage;