import tw from "twin.macro";
import {motion, AnimatePresence} from "framer-motion";
import { useState } from "react";
const colorVariants = {
    success: tw.div`bg-[#E7F4E7] border-l-[#76B07B]`,
    warning: tw.div`bg-[#FFF2DB] border-l-[#FEB74D;]`,
    fail: tw.div`bg-[#FFE7E1] border-l-[#FE8963]`
}
const Toast = ({type, title, description, icon}) => {
    const Container = tw(colorVariants[type])`fixed flex flex-row rounded-[12px] top-[10vh] -translate-x-1/2 inset-x-1/2 dt:h-24 w-2/3 tbl:w-fit border-l-[12px] p-4 gap-x-2 dt:gap-x-4 z-[60]`;
    const Icon = tw.img`items-center w-8`;
    const TextContainer = tw.div`flex flex-col w-fit ml-4 dt:mr-16 h-fit`;
    const Title = tw.div`font-bold font-ibm`;
    const Description = tw.div`font-ibm text-xs dt:text-sm`;
    const XButton = tw.button(colorVariants[type])`cursor-pointer dt:text-xl font-ibm`;
    const [close, setClose] = useState(false);
    return (
        !close&&
            <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <Container>
            <Icon src={icon}/>
            <TextContainer>
                <Title>{title}</Title>
                <Description>{description}</Description>    
            </TextContainer>
            <XButton onClick={()=>{
                setClose(true);
            }}>x</XButton>
        </Container>
        </motion.div>
    )
}
export default Toast;
