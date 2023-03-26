import tw from "twin.macro";
import React, { useState, useRef, useEffect } from "react";
import durationIcon from "../../assets/DurationIcon.svg";
import OptionIcon from "../../assets/OptionIcon.svg";
import OptionDropdown from "../Profile/OptionDropdown";
import { apiClient } from "../../utils/axios";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import Button from "./Button";
import Modal from "./Modal";
import { mapOptions } from "../../store/portfolioForm";

const Container = tw.div`flex flex-col h-fit rounded-[20px] min-w-[250px] w-1/5 shadow relative cursor-pointer`;
const Img = tw.img``;
const ContentContainer = tw.div`flex flex-col pl-4 border-b-2 border-[#B7B7B7] text-left w-full`;
const FirstRow = tw.div`flex justify-between relative`;
const OptionIconImg = tw.img`z-20`;
const Category = tw.div`mt-4 mb-2 text-freelance-pink text-sm font-ibm font-medium`;
const Name = tw.div`font-semibold text-xl leading-[2.4em] h-[2.4em] overflow-hidden`;
const Description = tw.p`my-2 leading-[1.2em] h-[3.5em] overflow-hidden text-sm mb-4 font-ibm`;
const FooterContainer = tw.div`flex flex-row justify-between p-2 items-center`;
const Duration = tw.div`flex flex-row items-center gap-x-2 text-[#707070]`;
const DurationIcon = tw.img`max-w-[1rem]`;
const Price = tw.div`font-sans text-freelance-black-secondary`;
const Backdrop = tw.div`absolute w-full h-full bg-black/50 z-20 rounded-[20px]`;

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
}) => {
  const [isVisible, setIsVisible] = useState(isPublic || false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const closeHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        console.log("wrong");
        setShow(false);
      }
    };

    document.addEventListener("mousedown", closeHandler);

    return () => {
      console.log("clean");
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
            "Do you really want to delete this portfolio? This process cannot be undone."
          }
          show={showModal}
          footer={
            <>
              <Button cancel disable={isLoading} onClick={onCancelHandler}>
                Cancel
              </Button>
              <Button
                deleted
                disable={isLoading}
                onClick={onClickDeleteHandler}
              >
                Delete
              </Button>
            </>
          }
        />
      )}

      <Container
        onClick={onClick ? onClick : () => {}}
        ref={menuRef}
        tw="font-ibm"
      >
        {!isVisible && <Backdrop />}
        <Img src={portImg} />
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
