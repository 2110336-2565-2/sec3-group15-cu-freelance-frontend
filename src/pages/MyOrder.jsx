import tw, { styled } from "twin.macro";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/share/Navbar";
import { useSearchParams } from "react-router-dom";
import { headerFreelance, headerCustomer } from "../store/myOrder-store";
import InputSearch from "../components/share/InputSearch";
import AddOrderIcon from "../assets/AddOrder.svg";

import OrderCard from "../components/share/OrderCard";
import "./MyOrder.css";

//Filter Import
import FilterModal from "../components/share/FilterModal";
import TemplateFilter from "../components/searchPage/TemplateFilter";
import PriceFilter from "../components/searchPage/PriceFilter";
import DurationFilter from "../components/searchPage/DurationFilter";

import { durationOptions, statusOptions } from "../store/search-store";

const BG = tw.div`h-[85vh] relative flex flex-col items-center font-ibm`;
const Header = tw.div`text-mobile-h1 font-bold my-4`;
const HeaderTwoContainer = tw.div`text-mobile-h2 flex justify-center w-4/5 mx-auto`;
const InputSearchContainer = tw.div`h-[40px] w-4/5 mx-auto my-4`;
const SortContainer = tw.div`flex justify-between items-center w-4/5 mx-auto text-mobile-h2 mb-4`;
const Select = tw.select`h-[30px] w-1/2 border border-[#BCBCBC] focus:outline-none rounded-lg text-mobile-body`;
const AddOrder = tw.img``;
const OrderContainer = tw.div`flex  w-full max-w-full overflow-auto pl-4 h-[500px]`;

const HeaderTwo = styled.div(({ type, select }) => [
  tw`text-center cursor-pointer text-freelance-black-secondary`,
  type === 1 && tw`w-1/2`,
  type === 2 && tw`w-1/3`,
  select &&
    tw`border-b-2  border-freelance-black-primary text-freelance-black-primary`,
]);
const MyOrderPage = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userInfo.user_type);
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectOrder = searchParams.get("q");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?pages=1&limit=6&keyword=${searchResult}`);
  };

  const searchResultChangeHandler = (e) => {
    setSearchResult(e.target.value);
  };

  const headerTwo =
    authCtx.userInfo.user_type === 1 ? headerFreelance : headerCustomer;

  const onChangeHeaderHandler = (name) => {
    searchParams.set("q", name);
    setSearchParams(searchParams);
  };

  //SetParams
  const setSelected = (filter, value) => {
    searchParams.set(filter, value);
    setSearchParams(searchParams);
    onResetPage();
  };
  const onResetPage = () => {
    searchParams.set("pages", 1);
    setSearchParams(searchParams);
  };
  //

  //Price
  const priceMin = searchParams.get("min_price") || "";
  const priceMax = searchParams.get("max_price") || "";
  const [priceShow, setPriceShow] = useState({ min: priceMin, max: priceMax });
  const onChangePriceHandler = (e) => {
    setPriceShow((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitPriceHandler = (e) => {
    e.preventDefault();
    setSelected("min_price", priceShow.min === "0" ? "1" : priceShow.min);
    setSelected("max_price", priceShow.max);
    setShowModal(false);
  };

  const onSubmitPriceHandler2 = () => {
    setSelected("min_price", priceShow.min === "0" ? "1" : priceShow.min);
    setSelected("max_price", priceShow.max);
    setShowModal(false);
  };
  //

  //Duration
  const duration = searchParams.get("duration") || "";
  const splitDuration = duration.split(",");
  const [showDuration, setShowDuration] = useState({
    "1": splitDuration.includes("1"),
    "3": splitDuration.includes("3"),
    "7": splitDuration.includes("7"),
    "15": splitDuration.includes("15"),
    "30": splitDuration.includes("30"),
  });
  const onChangeDurationHandler = (e) => {
    const changeValue = !showDuration[e.target.name];
    console.log(changeValue);
    setShowDuration((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
    let value = "";
    for (let duration in showDuration) {
      if (duration === e.target.name && changeValue) {
        value += duration + ",";
      } else if (
        duration !== e.target.name &&
        showDuration[duration] === true
      ) {
        value += duration + ",";
      }
    }
    if (value !== "") {
      value = value.slice(0, value.length - 1);
    }
    setSelected("duration", value);
    onResetPage();
  };
  //

  //Status
  const status = searchParams.get("status") || "";
  const splitStatus = status.split(",");
  const [showStatus, setShowStatus] = useState({
    "1": splitStatus.includes("1"),
    "2": splitStatus.includes("2"),
    "3": splitStatus.includes("3"),
  });
  const onChangeStatusHandler = (e) => {
    const changeValue = !showStatus[e.target.name];
    console.log(changeValue,"status");
    setShowStatus((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
    let value = "";
    for (let status in showStatus) {
      if (status === e.target.name && changeValue) {
        value += status + ",";
      } else if (status !== e.target.name && showStatus[status] === true) {
        value += status + ",";
      }
    }
    if (value !== "") {
      value = value.slice(0, value.length - 1);
    }
    setSelected("status", value);
    onResetPage();
  };
  //

  //FilterModal
  const [showModal, setShowModal] = useState(false);
  const onCloseModalHandler = () => {
    setShowModal(false);
  };
  const onOpenModalHandler = () => {
    setShowModal(true);
  };
  const FilterContent = (
    <>
      <TemplateFilter header="ช่วงราคา">
        <PriceFilter
          onChangePrice={onChangePriceHandler}
          onSubmitPrice={onSubmitPriceHandler}
          priceMin={priceShow.min}
          priceMax={priceShow.max}
          placeMin="0"
          placeMax="Max"
        />
      </TemplateFilter>
      <TemplateFilter header="ระยะเวลา">
        {durationOptions.map((option, idx) => (
          <DurationFilter
            value={option.value}
            text={option.text}
            key={idx}
            onChange={onChangeDurationHandler}
            showDuration={showDuration}
          />
        ))}
      </TemplateFilter>
      {selectOrder === "order" && (
        <TemplateFilter header="สถานะ">
          {statusOptions.map((option, idx) => (
            <DurationFilter
              value={option.value}
              text={option.text}
              key={`${option}+${idx}`}
              onChange={onChangeStatusHandler}
              showDuration={showStatus}
            />
          ))}
        </TemplateFilter>
      )}
    </>
  );

  return (
    <>
      <Navbar
        login={!!authCtx.acToken}
        search
        searchResult={searchResult}
        onChange={searchResultChangeHandler}
        onSubmit={onSearchHandler}
      />
      <BG>
        <FilterModal
          content={FilterContent}
          show={showModal}
          onClose={onCloseModalHandler}
          textBLeft="รีเซ็ต"
          textBRight="เรียบร้อย"
          onSubmitPrice={onSubmitPriceHandler2}
          onReset={() => {}}
        />
        <Header>ออเดอร์ของฉัน</Header>
        <HeaderTwoContainer>
          {headerTwo.map((header, idx) => (
            <HeaderTwo
              key={idx}
              select={header.q === selectOrder}
              type={authCtx.userInfo.user_type}
              onClick={onChangeHeaderHandler.bind(null, header.q)}
            >
              {header.text}
            </HeaderTwo>
          ))}
        </HeaderTwoContainer>
        <InputSearchContainer>
          {" "}
          <InputSearch
            placeholder="ค้นหาคำขอที่นี่..."
            filter
            onClickFilter={onOpenModalHandler}
          />
        </InputSearchContainer>
        <SortContainer>
          เรียงตาม
          <Select>
            <option value="1">ราคามากไปน้อย</option>
            <option value="1">ราคาน้อยไปมาก</option>
            <option value="2">ระยะเวลามากไปน้อย</option>
            <option value="2">ระยะเวลาน้อยไปมาก</option>
          </Select>
          <AddOrder src={AddOrderIcon} />
        </SortContainer>
        <OrderContainer className="no-scrollbar">
          <OrderCard
            header="ออกแบบโลโก้"
            description="ออกแบบโลโก้สำหรับธุรกิจการ จองที่พัก สีหลักคือชมพู..."
            name="JonathanT"
            duration="7"
            price="2000"
            hasStatus={selectOrder !== "template"}
            status="In Progress"
          />
          <OrderCard
            header="ออกแบบโลโก้"
            description="ออกแบบโลโก้สำหรับธุรกิจการ จองที่พัก สีหลักคือชมพู..."
            name="JonathanT"
            day="2/10/2023"
            price="2000"
            hasStatus={selectOrder !== "template"}
            status="Accept"
          />
        </OrderContainer>
      </BG>
    </>
  );
};

export default MyOrderPage;
