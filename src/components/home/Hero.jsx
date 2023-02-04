import tw  from "twin.macro"
import HumanImg from '../../assets/human.png'

const Wrapper = tw.div`
w-[90%] max-w-[1200px] mx-auto
mt-[20vh]
bg-[#D62B70] p-8
rounded-2xl
flex 
`;

const LeftWrapper = tw.div`
flex flex-col
gap-8
justify-center
w-[60%]
`;
const TextWrapper = tw.div`
    text-white
    flex flex-col
    gap-4
`;
const TextHeader1 = tw.h1`text-5xl font-semibold
font-sans
`;
const TextHeader2 = tw.h1`text-6xl font-bold
font-sans
`;
const TextBody = tw.p`w-[80%]`;
const InputWrapper = tw.input`
    w-[80%]
    px-2 py-2 
    rounded-xl
`;

const RightWrapper = tw.div``;
const ImageWrapper = tw.img``;

const Hero = () => {
    return (
        <Wrapper>
            <LeftWrapper>
                <TextWrapper>
                    <TextHeader1>ตามหาฟรีเเลนซ์</TextHeader1>
                    <TextHeader2>จุฬาฯ</TextHeader2>

                    <TextBody>Search for your next home with our easy to use search tool.</TextBody>
                </TextWrapper>
                <InputWrapper type="text" placeholder="Search for a home" />
            </LeftWrapper>
            <RightWrapper>
                <ImageWrapper src={HumanImg}/>
            </RightWrapper>
        </Wrapper>
      );
}
 
export default Hero;