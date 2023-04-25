import tw, { styled } from "twin.macro";
import React, { useState, useRef, useEffect } from "react";
import durationIcon from "../../assets/DurationIcon.svg";
import OptionIcon from "../../assets/OptionIcon.svg";
import OptionDropdown from "../Profile/OptionDropdown";
import { apiClient } from "../../utils/axios";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import Button from "./Button";
import Modal from "./Modal";
import { mapOptions } from "../../store/portfolioForm";

const Container = styled.div(({ isLanding }) => [
  tw`flex flex-col h-[376px] rounded-[20px] max-w-[270px] dt:w-[32%] shadow relative cursor-pointer overflow-hidden`,
  isLanding && tw`w-full dt:w-full`,
]);
const Img = tw.img`object-contain max-w-none h-full`;
const ContentContainer = tw.div`flex flex-col pl-4 border-b-2 border-[#B7B7B7] text-left w-full`;
const FirstRow = tw.div`flex justify-between relative`;
const OptionIconImg = tw.img`z-20`;
const Category = tw.div`mt-4 mb-2 text-freelance-pink text-sm font-ibm font-medium`;
const Name = tw.div`text-freelance-black-primary font-semibold text-xl leading-[2.4em] h-[2.4em] overflow-hidden`;
const Description = tw.p`my-2 leading-[1.2em] h-[3.5em] overflow-hidden text-sm mb-4 font-ibm`;
const FooterContainer = tw.div`flex flex-row justify-between p-2 items-center`;
const Duration = tw.div`flex flex-row items-center gap-x-2 text-[#707070]`;
const DurationIcon = tw.img`max-w-[1rem]`;
const Price = tw.div`font-sans text-freelance-black-secondary`;
const Backdrop = tw.div`absolute w-full h-[376px] bg-black/50 z-20 rounded-[20px]`;

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
  id,
  setPortfolios,
  canEdit,
  isLanding = false,
}) => {
  const [isVisible, setIsVisible] = useState(isPublic || false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log("openEye");
    e.stopPropagation();
    setIsVisible(true);
    setShow(false);
    try {
      const data = JSON.stringify({ is_public: true });
      const res = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onClosedEyeHandler = async (e) => {
    console.log("closeEye");
    e.stopPropagation();
    setIsVisible(false);
    setShow(false);
    try {
      const data = JSON.stringify({ is_public: false });
      const res = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    setShow(false);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const onCancelHandler = () => {
    setShowModal(false);
    document.body.style.overflow = "";
  };

  const onClickDeleteHandler = async () => {
    console.log(id);
    try {
      setIsLoading(true);
      const response = await apiClient.delete(`/portfolio/${id}`);
      console.log(response.data);
      document.body.style.overflow = "";
    } catch (err) {
      console.log(err);
    }
    setPortfolios((prevs) => prevs.filter((prev) => prev.id !== id));
    setIsLoading(false);
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          header={DeleteIcon}
          onCancel={onCancelHandler}
          text={
            <>
              ยืนยันการลบพอร์ตโฟลิโอ
              <br /> การกระทำนี้จะไม่สามารถย้อนกลับได้
            </>
          }
          show={showModal}
          footer={
            <>
              <Button cancel disable={isLoading} onClick={onCancelHandler}>
                ยกเลิก
              </Button>
              <Button
                deleted
                disable={isLoading}
                onClick={onClickDeleteHandler}
              >
                ลบ
              </Button>
            </>
          }
        />
      )}

      <Container
        onClick={onClick ? onClick : () => {}}
        ref={menuRef}
        tw="font-ibm"
        isLanding={isLanding}
      >
        {!isVisible && <Backdrop />}
        <div tw="w-full h-full overflow-hidden flex justify-center items-center rounded-t-[20px]">
          <Img src={portImg} />
        </div>
        <ContentContainer>
          <FirstRow>
            <Category>{mapOptions[category]}</Category>
            {canEdit && (
              <OptionIconImg src={OptionIcon} onClick={optionHandler} />
            )}
            {show && (
              <OptionDropdown
                show={show}
                onClickPencil={onClickPencil}
                setShow={setShow}
                onClickOpenEye={onOpenEyeHandler}
                onClickClosedEye={onClosedEyeHandler}
                onClickDelete={onDeleteHandler}
                isVisible={isVisible}
              />
            )}
          </FirstRow>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </ContentContainer>
        <FooterContainer>
          <Duration>
            <DurationIcon src={durationIcon}></DurationIcon>
            <div tw="font-ibm">{duration} วัน</div>
          </Duration>
          <Price>{price.toLocaleString("en-US")}.-</Price>
        </FooterContainer>
      </Container>
    </>
  );
};
export default PortFolioCard;
