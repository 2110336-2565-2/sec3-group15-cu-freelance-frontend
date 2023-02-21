import tw from "twin.macro";
import { useState,useRef,useEffect } from "react";
import durationIcon from "../../assets/DurationIcon.svg";
import OptionIcon from "../../assets/OptionIcon.svg";
import OptionDropdown from "../Profile/OptionDropdown";
import { apiClient } from "../../utils/axios";

const Container = tw.div`flex flex-col h-fit rounded-[20px] min-w-[250px] w-1/5 shadow-xl relative cursor-pointer`;
const Img = tw.img``;
const ContentContainer = tw.div`flex flex-col pl-4 border-b-2 border-[#B7B7B7] text-left w-full`;
const FirstRow = tw.div`flex justify-between relative`;
const OptionIconImg = tw.img`z-40`;
const Category = tw.div`mt-4 mb-2 text-[#D62B70] text-sm font-medium`;
const Name = tw.div`font-bold text-3xl`;
const Description = tw.p`my-2 leading-[1.2em] h-[3.5em] overflow-hidden text-sm mb-4 font-ibm`;
const FooterContainer = tw.div`flex flex-row justify-between p-2 items-center`;
const Duration = tw.div`flex flex-row items-center gap-x-2 text-[#707070]`;
const DurationIcon = tw.img`max-w-[1rem]`;
const Price = tw.div`text-[#151515] font-semibold`;
const Backdrop = tw.div`absolute w-full h-full bg-black/50 z-30 rounded-[20px]`;

const PortFolioCard = ({
  portImg,
  category,
  name,
  description,
  duration,
  price,
  isPublic,
  onClick,
  onClickPencil,
  userId,
  id
}) => {
  const [isVisible, setIsVisible] = useState(isPublic);
  const [show, setShow] = useState(false);
  
  const menuRef = useRef();

  useEffect(() => {
    const closeHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", closeHandler);

    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  }, []);


  const optionHandler = (e) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  const onOpenEyeHandler = async (e) => {
    console.log('openEye')
    e.stopPropagation();
    setIsVisible(true);
    setShow(false)
    try {
      const data = JSON.stringify({ is_public: true });
      const res = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  };

  const onClosedEyeHandler = async (e) => {
    console.log('closeEye')
    e.stopPropagation();
    setIsVisible(false);
    setShow(false)
    try {
      const data = JSON.stringify({ is_public: false });
      const res = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container onClick={onClick ? onClick : () => {}} ref={menuRef}>
      {!isVisible && <Backdrop />}
      <Img src={portImg} />
      <ContentContainer>
        <FirstRow>
          <Category>{category}</Category>
          <OptionIconImg src={OptionIcon} onClick={optionHandler} />
          {show&&<OptionDropdown
            show={show}
            onClickPencil={onClickPencil}
            setShow={setShow}
            onClickOpenEye={onOpenEyeHandler}
            onClickClosedEye={onClosedEyeHandler}
            isVisible={isVisible}
            
          />}
        </FirstRow>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </ContentContainer>
      <FooterContainer>
        <Duration>
          <DurationIcon src={durationIcon}></DurationIcon>
          <div tw="font-ibm">{duration} วัน</div>
        </Duration>
        <Price>{price}.-</Price>
      </FooterContainer>
    </Container>
  );
};
export default PortFolioCard;
