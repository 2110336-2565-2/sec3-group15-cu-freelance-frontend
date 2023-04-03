import React, { useState, useEffect } from "react";
import { useContext } from "react";
import tw, { styled } from "twin.macro";
import { AuthContext } from "../../context/AuthProvider";
import { headerTwoSummaryPort, mapOptions } from "../../store/portfolioForm";
import Button from "../share/Button";
import ImageCarousel from "./ImageCarousel";
import { apiClient } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import PortfolioCard from "../share/PortfolioCard";
import LoadingModal from "../share/LoadingModal";
import { delay } from "../../utils/delay";

const Header = tw.div`font-bold text-mobile-h1`;
const HeaderDescription = tw.div`w-[90%] text-freelance-black-secondary text-center`;
const ContainDescription = tw.div`flex flex-col w-full items-start`;
const Header2 = tw.div`text-mobile-h2 font-semibold`;
const Description = tw.div`text-freelance-black-secondary`;
const ButtonContainer = tw.div`w-[90%] mx-auto flex flex-col items-center gap-y-3 mb-2 justify-center`;
const Back2Edit = styled.button(({}) => [
  tw`text-center font-ibm decoration-solid font-medium text-mobile-small cursor-pointer`,
]);
const HeaderTwo = styled.button(({ userType, select }) => [
  tw`text-center cursor-pointer text-freelance-black-secondary w-1/2 mb-5`,
  select &&
    tw`border-b-2  border-freelance-black-primary text-freelance-black-primary`,
]);
const CreatePortForm4 = ({
  formState1,
  formState2,
  formState3,
  setStage,
  isPublic,
  setIsPublic,
}) => {
  const [q, setQ] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const { portfolioName, description } = formState1.inputs;
  const { category, duration, price } = formState2.inputs;
  const { image, thumbnail } = formState3.inputs;
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const images = [];
    image.value.some((img) => {
      images.push(URL.createObjectURL(img));
    });
    // console.log(thumbnail.value);
    images.push(URL.createObjectURL(thumbnail.value[0]));
    setPreview(images);
  }, [image]);
  useEffect(() => {
    if (!thumbnail) return;
    const thumbnail2 = thumbnail.value[0];
    setPreviewThumbnail(URL.createObjectURL(thumbnail2));
  }, [thumbnail]);

  console.log(thumbnail.value[0]);
  //   console.log(authCtx);
  const handleCreateForm = async () => {
    try {
      setIsLoading(true);
      // await delay(10000000);
      let data = JSON.stringify({
        category: category.value,
        description: description.value,
        price: parseFloat(price.value),
        is_public: isPublic,
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
      data = new FormData();
      data.append("file", thumbnail.value[0]);
      let res = await apiClient.put(`/file/portfolio/${portfolioId}`, data);
      console.log(res);

      data = JSON.stringify({ key: res.data.url.split("net/")[1] });
      res = await apiClient.put(
        `/file/portfolio/${portfolioId}/thumbnail`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);

      navigate("/request-complete", {
        state: {
          title: "การสร้างพอร์ตฟอลิโอสำเร็จ",
          desc: "ยินดีด้วย พอร์ตโฟลิโอของคุณถูกสร้างแล้วไปดูได้เลย!",
          bt1Text: "ไปหน้าโปรไฟล์",
          path1: `/profile/${authCtx.userInfo.id}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const onChangeHeaderHandler = (q) => {
    setQ(q);
  };
  console.log(isPublic);
  return (
    <>
      <LoadingModal
        show={isLoading}
        header={"กำลังสร้างพอร์ตฟอลิโอ"}
        desc={"เรากำลังอัพโหลดพอร์โฟลิโอคุณเข้าสู่ระบบกรุณารอสักครู่..."}
      />
      <div tw="w-[90%] h-fit flex flex-col items-center min-h-[40vh]">
        <div tw="w-full flex">
          {headerTwoSummaryPort.map((header, idx) => (
            <HeaderTwo
              key={idx}
              type="button"
              select={header.q === q}
              onClick={onChangeHeaderHandler.bind(null, header.q)}
              // disabled={isLoadingOrder}
            >
              {header.text}
            </HeaderTwo>
          ))}
        </div>
        {q == 2 && (
          <>
            <Header>ตรวจสอบการ์ดอีกครั้ง</Header>
            <HeaderDescription>
              ตรวจสอบความถูกต้องของการ์ดคุณอีกครั้ง
              ถ้าถูกต้องก็สร้างพอร์ตฟอลิโอ์ได้เลย!!
            </HeaderDescription>
            {previewThumbnail && (
              <div tw="w-full mx-auto flex justify-center my-5">
                {" "}
                <PortfolioCard
                  portImg={previewThumbnail}
                  category={category.value}
                  name={portfolioName.value}
                  description={description.value}
                  duration={duration.value}
                  price={price.value}
                  isPublic={true}
                  onClick={() => {}}
                  onClickPencil={() => {}}
                  isLanding={true}
                />
              </div>
            )}
          </>
        )}
        {q === 1 && (
          <>
            {" "}
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
          </>
        )}
      </div>
      {preview && q === 1 && <ImageCarousel images={preview} />}
      {q == 1 && (
        <div tw="w-[90%] flex gap-x-2">
          <input
            type="checkbox"
            id="ch"
            checked={isPublic === false}
            onChange={setIsPublic}
          />
          <label htmlFor="ch">ปิดการมองเห็นพอร์ตฟอลิโอ</label>
        </div>
      )}
      <ButtonContainer>
        <Button
          primary
          onClick={handleCreateForm}
          width="100%"
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
