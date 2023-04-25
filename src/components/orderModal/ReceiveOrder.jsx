import React, { useEffect, useState } from "react";
import { apiClient } from "../../utils/axios";
import tw from "twin.macro";
import LoadingSpinner from "../share/LoadingSpinner";
import Filename from "../Portfolio/createPortfolioPage3/Filename";
import Button from "../share/Button";
import StatusBar from "../orderCard/StatusBar";
import DotPic from "../../assets/Order/DotPic.svg";
import { stringToDate } from "../../utils/stringToDate";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import PortfolioModal from "../Portfolio/PortfolioModal";
import LoadingModal from "../share/LoadingModal";
import SubmitIcon from "../../assets/CreatePort/SubmitIcon.svg";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const InformationContainer = tw.div`h-[82vh] dt:h-[80%] flex flex-col gap-y-5`;
const TitleLine = tw.div`flex items-center font-bold border-b-2 border-b-freelance-pink p-1 w-full`;
const Title = tw.div`text-[24px]`;
const PriceLine = tw.div`font-bold text-[32px]`;
const DotContainer = tw.img`w-[20px] mx-auto`;
const DateContainer = tw.div`text-[20px] font-semibold`;
const ButtonContainer = tw.div`mx-auto flex justify-between w-[90%]`;
const ModalContainer = tw.div`flex flex-col items-center justify-center w-full h-[85%] mb-2  mx-auto`;
const ButtonModal = tw.div`h-[7%] w-full flex justify-center px-[5%]`;
const ModalImage = tw.img`object-scale-down h-[70%]`;

const ReceiveOrder = ({ id, setOrderModalPage, setSuccessType }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [list, setList] = useState(null);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [namePreview, setNamePreview] = useState(null);
  const [typePreview, setTypePreview] = useState(null);
  const [isShowReceive, setIsShowReceive] = useState(false);
  const [isLoadingReceive, setIsLoadingReceive] = useState(false);

  let color;
  const status = order ? order.status : null;
  if (status === "complete" || status === "accept") color = "green";
  if (status === "in progress") color = "orange";
  if (status === "reject" || status === "failed") color = "red";
  if (status === "pending") color = "gray";
  if (status === "close") color = "blue";
  let showDate;
  if (list && list.length > 0) {
    showDate = stringToDate(list[list.length - 1].createdAt);
  }
  const handleClickPrev = () => {
    setOrderModalPage(1);
  };
  console.log(preview);
  const handleClickName = (file, idx) => {
    setPreview(file.url);
    setIsShow(true);
    setNamePreview("order" + (idx + 1).toString() + file.type.split("/")[1]);
    setTypePreview(file.type.split("/")[0]);
  };

  const handleCloseModal = () => {
    setPreview(null);
    setIsShow(false);
  };

  const handlePrevModal = () => {
    setIsShow(false);
    setPreview(null);
  };

  const handleClickConfirm = () => {
    setIsShowReceive(true);
  };

  const handleCancelReceive = () => {
    setIsShowReceive(false);
  };

  const handleSumbitReceive = async () => {
    setIsLoadingReceive(true);
    try {
      const res = await apiClient.put(`/order/${id}/accept`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setOrderModalPage(2);
    setSuccessType("receive");
    setIsLoadingReceive(false);
    setIsShowReceive(false);
  };

  const modalContent = (
    <>
      <ModalContainer>
        <div tw="font-bold">{namePreview}</div>
        {typePreview && typePreview.split("/")[0] === "image" ? (
          <ModalImage src={preview} />
        ) : (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {" "}
            <div tw="w-[90%] h-[90%] dt:h-[90%]">
              {" "}
              <Viewer
                fileUrl={preview}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        )}
      </ModalContainer>
      <ButtonModal>
        <Button secondary onClick={handlePrevModal} width="40%">
          ย้อนกลับ
        </Button>
      </ButtonModal>
    </>
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get(`/order/${id}`);
        setOrder(res.data.order);
        setList(res.data.submission.submissions);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
      <LoadingModal
        pic={
          isLoadingReceive ? null : (
            <img src={SubmitIcon} tw="w-[30px] h-[30px]" />
          )
        }
        onCancel={isLoadingReceive ? null : handleCancelReceive}
        show={isShowReceive}
        header={isLoadingReceive ? "กำลังยืนยันออเดอร์" : "ยืนยันออเดอร์"}
        desc={
          isLoadingReceive
            ? "เรากำลังยืนยันออเดอร์ โปรดรอสักครู่"
            : "หากคุณยืนยันออเดอร์แล้ว จะไม่สามารถขอรับเงินคืนภายหลังได้"
        }
        footer={
          isLoadingReceive ? null : (
            <div tw="w-[80%] flex justify-between">
              <Button secondary width="40%" onClick={handleCancelReceive}>
                ยกเลิก
              </Button>
              <Button primary width="40%" onClick={handleSumbitReceive}>
                ยืนยัน
              </Button>
            </div>
          )
        }
      />
      {isLoading && <LoadingSpinner />}
      {preview && (
        <PortfolioModal
          show={isShow}
          onClose={handleCloseModal}
          header="เเสดงตัวอย่างงาน"
          content={modalContent}
        />
      )}
      {!isLoading && order && list && (
        <InformationContainer>
          <TitleLine>
            <Title>{order.title}</Title>
            <StatusBar color={color}>{status}</StatusBar>
          </TitleLine>
          <PriceLine>{`฿ ${order.price}`}</PriceLine>
          <DotContainer src={DotPic} />
          <DateContainer>{"ส่งเมื่อ " + showDate}</DateContainer>
          <div tw="max-h-[500px] flex flex-col gap-y-2 overflow-y-auto mb-5">
            {!isLoading &&
              list &&
              list.map((order, idx) => (
                <Filename
                  name={`order` + (idx + 1) + "." + order.type.split("/")[1]}
                  onClick={handleClickName.bind(null, order, idx)}
                  canDelete={false}
                />
              ))}
          </div>
        </InformationContainer>
      )}
      <ButtonContainer>
        <Button secondary width="40%" onClick={handleClickPrev}>
          ย้อนกลับ
        </Button>
        <Button
          primary
          width="40%"
          onClick={handleClickConfirm}
          disable={order ? order.status === "complete" : true}
        >
          ยืนยันออเดอร์
        </Button>
      </ButtonContainer>
    </>
  );
};

export default ReceiveOrder;
