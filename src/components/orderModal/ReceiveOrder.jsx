import React, { useEffect, useState } from "react";
import { apiClient } from "../../utils/axios";
import tw from "twin.macro";
import LoadingSpinner from "../share/LoadingSpinner";
import Filename from "../Portfolio/createPortfolioPage3/Filename";
import Button from "../share/Button";
import StatusBar from "../orderCard/StatusBar";
import DotPic from "../../assets/Order/DotPic.svg";
import { stringToDate } from "../../utils/stringToDate";
import { Worker } from "@react-pdf-viewer/core";

const InformationContainer = tw.div`h-[82vh] dt:h-[70vh] flex flex-col gap-y-5`;
const TitleLine = tw.div`flex items-center font-bold border-b-2 border-b-freelance-pink p-1 w-full`;
const Title = tw.div`text-[24px]`;
const PriceLine = tw.div`font-bold text-[32px]`;
const DotContainer = tw.img`w-[20px] mx-auto`;
const DateContainer = tw.div`text-[20px] font-semibold`;
const ButtonContainer = tw.div`w-full flex justify-between`;

const ReceiveOrder = ({ id, setOrderModalPage }) => {
  const [list, setList] = useState(null);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let color;
  const status = order ? order.status : null;
  if (status === "complete" || status === "accept") color = "green";
  if (status === "in progress") color = "orange";
  if (status === "reject" || status === "failed") color = "red";
  if (status === "pending") color = "gray";
  if (status === "close") color = "blue";

  if (list && list.length > 0) {
    stringToDate(list[0].createdAt);
  }
  const handleClickPrev = () => {
    setOrderModalPage(1);
  };

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
      {isLoading && <LoadingSpinner />}
      {!isLoading && order && list && (
        <InformationContainer>
          <TitleLine>
            <Title>{order.title}</Title>
            <StatusBar color={color}>{status}</StatusBar>
          </TitleLine>
          <PriceLine>{`฿ ${order.price}`}</PriceLine>
          <DotContainer src={DotPic} />
          <DateContainer>{"ส่งเมื่อ "}</DateContainer>
          <div tw="max-h-[500px] flex flex-col gap-y-2 overflow-y-auto mb-5">
            {!isLoading &&
              list &&
              list.map((order, idx) => (
                <Filename
                  name={`order` + (idx + 1) + "." + order.type.split("/")[1]}
                  onClick={() => {}}
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
        <Button primary width="40%">
          ยืนยันออเดอร์
        </Button>
      </ButtonContainer>
    </>
  );
};

export default ReceiveOrder;
