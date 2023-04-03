import tw, {styled} from "twin.macro"
import React from "react"
import defaultProfile from "../../assets/DefaultProfile.svg"
import { motion } from "framer-motion";
import circle from "../../assets/NewHomePage/page1/circle16.png";
const Container = styled.div(()=>[
    tw`relative w-full h-full`
])
const Image = styled.img(()=>[ 
    tw`z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-full w-full h-full`
])
const CircleImage = ({image, isAnimate})=>{
    //How to use: Create Container with desire witdth and height (should be equal) in which 
    // this component will be contained
    return (
        <>
            <Container>
                <Image src={image ? image : defaultProfile}/>
                {isAnimate && <motion.img
                src={circle}
                alt="Circle img"
                tw="absolute bottom-[10px]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5 }}
              />}   
            </Container>
        </>
    )
}
export default CircleImage;