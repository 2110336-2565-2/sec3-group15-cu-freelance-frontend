import React, { useState, useEffect } from "react";
import { useContext } from "react";
import tw, { styled } from "twin.macro";
import { AuthContext } from "../../context/AuthProvider";
import { mapOptions } from "../../store/portfolioForm";
import Button from "../share/Button";
import ImageCarousel from "./ImageCarousel";
import { apiClient } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Header = tw.div`font-bold text-mobile-h1`;
const HeaderDescription = tw.div`w-[90%] text-freelance-black-secondary text-center`;
const ContainDescription = tw.div`flex flex-col w-full items-start`;
const Header2 = tw.div`text-mobile-h2`;
const Description = tw.div`text-freelance-black-secondary`;
const ButtonContainer = tw.div`w-[90%] mx-auto flex flex-col items-center gap-y-3 mb-2`;
const Back2Edit = styled.button(({}) => [
  tw`text-center font-ibm decoration-solid font-medium text-mobile-small cursor-pointer`,
]);

const CreatePortForm4 = ({ formState1, formState2, formState3, setStage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { portfolioName, description } = formState1.inputs;
  const { category, duration, price } = formState2.inputs;
  const { image } = formState3.inputs;
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const images = [];
    image.value.some((img) => {
      images.push(URL.createObjectURL(img));
    });
    setPreview(images);
  }, [image]);

  //   console.log(authCtx);
  const handleCreateForm = async () => {
    try {
      setIsLoading(true);
      let data = JSON.stringify({
        category: category.value,
        description: description.value,
        price: parseFloat(price.value),
        is_public: true,
        duration: parseInt(duration.value),
        name: portfolioName.value,
        userID: authCtx.userInfo.id,
      });
      const response = await apiClient.post("/portfolio", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      const portfolioId = response.data.portfolio.id;
      for (var x = 0; x < image.value.length; x++) {
        let data = new FormData();
        data.append("file", image.value[x]);
        const response = await apiClient.put(
          `/file/portfolio/${portfolioId}`,
          data
        );
        console.log(response);
      }

      navigate(-1, { replace: true });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div tw="w-[90%] h-fit flex flex-col items-center">
        <Header>ตรวจสอบออเดอร์อีกครั้ง</Header>
        <HeaderDescription>
          ตรวจสอบความถูกต้องของออเดอร์คุณอีกครั้ง
          ถ้าถูกต้องก็สร้างออเดอร์ได้เลย!!
        </HeaderDescription>
        <ContainDescription>
          <Header2>หัวข้องาน</Header2>
          <Description>{portfolioName.value}</Description>
        </ContainDescription>
        <ContainDescription>
          <Header2>รายละเอียดงาน</Header2>
          <Description>{description.value}</Description>
        </ContainDescription>
        <ContainDescription>
          <Header2>หมวดหมู่</Header2>
          <Description>{mapOptions[category.value]}</Description>
        </ContainDescription>
        <ContainDescription>
          <Header2>ราคา</Header2>
          <Description>{`${price.value} บาท`}</Description>
        </ContainDescription>
        <ContainDescription>
          <Header2>ระยะเวลา</Header2>
          <Description>{`${duration.value} วัน`}</Description>
        </ContainDescription>
      </div>
      {preview && <ImageCarousel images={preview} />}
      <ButtonContainer>
        <Button
          primary
          onClick={handleCreateForm}
          width="90%"
          disable={isLoading}
        >
          {isLoading === true ? "กำลังสร้างพอร์ตฟอลิโอ" : "ยืนยันการสร้าง"}
        </Button>
        <Back2Edit
          onClick={(e) => {
            e.preventDefault();
            setStage(1);
          }}
          disabled={isLoading}
        >
          <u>กลับไปแก้ไข</u>
        </Back2Edit>
      </ButtonContainer>
    </>
  );
};

export default CreatePortForm4;
