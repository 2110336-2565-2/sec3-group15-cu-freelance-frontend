import tw from "twin.macro";
import HumanImg from "../../assets/human.png";
import searchIcon from "../../assets/searchIcon.svg";
const Wrapper = tw.div`
w-[90%] max-w-[1200px] mx-auto
h-[70vh]
mt-[15vh] 
bg-[#D62B70] p-8
rounded-2xl
flex 
`;

const LeftWrapper = tw.div`
flex flex-col
gap-8
justify-center
w-[50%]
`;
const TextWrapper = tw.div`
    text-white
    flex flex-col
    gap-4
`;
const TextHeader1 = tw.h1`tracking-wide text-7xl font-semibold
font-ibm
`;
const TextHeader2 = tw.h1`text-8xl font-bold
font-ibm
drop-shadow-md
`;
const TextBody = tw.p`w-[49%] text-lg font-medium font-ibm drop-shadow-md`;
const HighLightTextBody = tw.span`text-3xl font-medium font-ibm drop-shadow-md`;
// const InputWrapper = tw.input`
//     w-[80%]
//     px-2 py-2 
//     rounded-xl
// `;

const RightWrapper = tw.div`w-[50%] flex justify-center`;
const ImageWrapper = tw.img`object-contain`;

const Hero = () => {
  return (
    <Wrapper>
      <LeftWrapper>
        <TextWrapper>
          <TextHeader1>ตามหาฟรีเเลนซ์</TextHeader1>
          <TextHeader2>จุฬาฯ</TextHeader2>

          <TextBody>
            เลือกฟรีแลนซ์จากจุฬาฯ กว่า 2,000 คน ที่จะทำให้ไอเดียของคุณเป็น
            <HighLightTextBody> จริง</HighLightTextBody>
          </TextBody>
        </TextWrapper>
        <div
          tw="relative  w-[50%] h-[6%] rounded-md bg-white min-w-[220px]  text-[#D62B70]"  
        >
          <input
            type="text"
            placeholder="กำลังตามหาอะไรอยู่..."
            tw="border-none placeholder:text-[#F4B8DA] focus:outline-none bg-transparent ml-[2%] mr-[15%] w-[80%] h-[100%] text-base font-ibm"
          />
          <img
            src={searchIcon}
            alt="searchIcon"
            tw="w-[9%] absolute left-[90%] top-[50%] translate-y-[-50%] "
          />
        </div>
      </LeftWrapper>
      <RightWrapper>
        <ImageWrapper src={HumanImg} />
      </RightWrapper>
    </Wrapper>
  );
};

export default Hero;
