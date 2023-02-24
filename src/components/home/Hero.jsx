import { useNavigate } from "react-router-dom";
import { useState } from "react";
import tw from "twin.macro";
import HumanImg from "../../assets/human.png";
import searchIcon from "../../assets/searchIcon.svg";

const Wrapper = tw.div`
w-[90%] max-w-[1200px] mx-auto
h-[70vh]
mt-[5vh]
bg-[#D62B70] p-8
rounded-2xl
flex snap-center
`;

// Left Side
const LeftWrapper = tw.div`
    flex flex-col justify-center gap-8
`;

// Left Side Text
const TextWrapper = tw.div`text-white flex flex-col gap-4`;
const TextHeader1 = tw.h1`text-7xl font-semibold font-ibm tracking-wide drop-shadow-md `;
const TextHeader2 = tw.h1`text-8xl font-bold font-ibm drop-shadow-md`;
const TextBody = tw.p`text-lg font-medium font-ibm drop-shadow-md w-[49%]`;
const HighLightTextBody = tw.span`text-3xl font-medium font-ibm drop-shadow-md`;

// Left Side Input
const InputWrapper = tw.form`
    relative  w-[50%] h-[6%] rounded-md bg-white min-w-[220px]  text-[#D62B70]
`;
const Input = tw.input`border-none placeholder:text-[#F4B8DA] focus:outline-none bg-transparent ml-[2%] mr-[15%] w-[80%] h-[100%] text-base font-ibm`;
const SearchIcon = tw.img`w-[9%] absolute left-[90%] top-[50%] translate-y-[-50%] `;

// Right Side
const RightWrapper = tw.div`w-[50%] flex justify-center`;
const ImageWrapper = tw.img`object-contain`;

const Hero = () => {
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?pages=1&limit=6&keyword=${searchResult}`);
  };

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

        <InputWrapper onSubmit={onSubmitHandler}>
          <Input
            type="text"
            placeholder="กำลังตามหาอะไรอยู่..."
            onChange={(e) => {
              setSearchResult(e.target.value);
            }}
            value={searchResult}
          />
          <SearchIcon src={searchIcon} alt="searchIcon" />
        </InputWrapper>
      </LeftWrapper>

      <RightWrapper>
        <ImageWrapper src={HumanImg} />
      </RightWrapper>
    </Wrapper>
  );
};

export default Hero;
