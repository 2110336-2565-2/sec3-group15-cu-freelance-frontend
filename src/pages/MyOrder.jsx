import tw, { styled } from "twin.macro";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/share/Navbar";
import { useSearchParams } from "react-router-dom";
import {
  headerFreelance,
  headerCustomer,
  sortOptions,
} from "../store/myOrder-store";
import InputSearch from "../components/share/InputSearch";
import AddOrderIcon from "../assets/AddOrder.svg";

import OrderCard from "../components/share/OrderCard";
import "./MyOrder.css";

//Filter Import
import FilterModal from "../components/share/FilterModal";
import TemplateFilter from "../components/searchPage/TemplateFilter";
import PriceFilter from "../components/searchPage/PriceFilter";
import DurationFilter from "../components/searchPage/DurationFilter";

import { apiClient } from "../utils/axios";

import {
  durationOptions,
  statusOptions,
  statusRequest,
} from "../store/search-store";
import OrderModalTemplate from "../components/share/OrderModalTemplate";
import ConfirmModal from "../components/share/ConfirmModal";
import ConfirmModalTemplate from "../components/share/ConfirmModalTemplate";

const BG = tw.div`h-[85vh] relative flex flex-col items-center font-ibm`;
const Header = tw.div`text-mobile-h1 font-bold my-4`;
const HeaderTwoContainer = tw.div`text-mobile-h2 flex justify-center w-4/5 mx-auto`;
const InputSearchContainer = tw.div`h-[40px] w-4/5 mx-auto my-4`;
const SortContainer = tw.div`flex justify-between items-center w-4/5 mx-auto text-mobile-h2 mb-4`;
const Select = tw.select`h-[30px] w-1/2 border border-[#BCBCBC] focus:outline-none rounded-lg text-mobile-body`;
const AddOrder = tw.img``;
const OrderContainer = tw.div`flex  w-full max-w-full overflow-auto pl-4 h-[500px]`;
const LoadingDiv = tw.div`font-ibm`;

const HeaderTwo = styled.button(({ userType, select }) => [
  tw`text-center cursor-pointer text-freelance-black-secondary`,
  userType === 1 && tw`w-1/2`,
  userType === 2 && tw`w-1/3`,
  select &&
    tw`border-b-2  border-freelance-black-primary text-freelance-black-primary`,
]);
const MyOrderPage = () => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userInfo.user_type;
  // console.log(authCtx.userInfo.user_type);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  //InfiniteScroll or Pagination
  const pageParams = searchParams.get("pages") || 1;
  const [page, setPage] = useState(pageParams);

  //header-type
  const selectOrder = searchParams.get("q");
  const onChangeHeaderHandler = (name) => {
    searchParams.set("q", name);
    setSearchParams(searchParams);
  };

  //searchOrder
  const searchOrder = searchParams.get("keywords") || "";
  const onSearchKeywordHandler = (e) => {
    e.preventDefault();
    // navigate(`/search?pages=1&keyword=${searchResult}`);
  };

  const searchKeywordChangeHandler = (e) => {
    searchParams.set("keywords", e.target.value);
    onResetPage();
  };

  //searchPortfolio
  const [searchResult, setSearchResult] = useState("");
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?pages=1&keyword=${searchResult}`);
  };

  const searchResultChangeHandler = (e) => {
    setSearchResult(e.target.value);
  };

  const headerTwo = userType === 1 ? headerFreelance : headerCustomer;

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
  const resetAllParams = () => {
    searchParams.delete("min_price");
    searchParams.delete("max_price");
    searchParams.delete("duration");
    searchParams.delete("status");
    setShowDuration({
      1: false,
      3: false,
      7: false,
      15: false,
      30: false,
    });
    setShowStatus({
      1: false,
      2: false,
      3: false,
    });
    setPriceShow({ min: "", max: "" });
    onResetPage();
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
    1: splitDuration.includes("1"),
    3: splitDuration.includes("3"),
    7: splitDuration.includes("7"),
    15: splitDuration.includes("15"),
    30: splitDuration.includes("30"),
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
    1: splitStatus.includes("1"),
    2: splitStatus.includes("2"),
    3: splitStatus.includes("3"),
    4: splitStatus.includes("4"),
  });
  const onChangeStatusHandler = (e) => {
    const changeValue = !showStatus[e.target.name];
    console.log(changeValue, "status");
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

  //sort
  const sort = searchParams.get("sort") || "1";
  const onChangeSortHandler = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
    onResetPage();
  };

  //fetch order
  const [orders, setOrders] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const fetchData = async (
    headerType,
    page,
    priceMin,
    priceMax,
    duration,
    sort
  ) => {
    let ht = "/" + headerType;
    if (ht === "/order") ht = "";
    setIsLoadingOrder(true);
    try {
      let params = {
        limit: 6,
        page: page,
        // keyword: keyword,
        sort: sort,
        min_price: priceMin !== "" ? priceMin : 1,
        max_price: priceMax !== "" ? priceMax : 100000,
        duration: duration !== "" ? duration : null,
      };
      for (let param in params) {
        if (
          params[param] === undefined ||
          params[param] === null ||
          params[param] === ""
        ) {
          delete params[param];
        }
      }

      let response;
      response = await apiClient.get(
        `/order${ht}?` + new URLSearchParams(params).toString()
      );
      // console.log(response.data);
      if (selectOrder === "template") setOrders(response.data.order_templates);
      else if (selectOrder === "request") setOrders(response.data.requests);
      else setOrders(response.data.orders);

      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingOrder(false);
  };
  useEffect(() => {
    fetchData(selectOrder, page, priceMin, priceMax, duration, sort);
  }, [
    selectOrder,
    // keyword,
    page,
    priceMin,
    priceMax,
    duration,
    sort,
  ]);

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
      {selectOrder === "request" && userType === 2 && (
        <TemplateFilter header="สถานะ">
          {statusRequest.map((option, idx) => (
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

  //OrderModalTemplate
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalPage, setOrderModalPage] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const onCloseOrderModal = () => {
    setShowOrderModal(false);
  };
  const onClickCardHandler = (order) => {
    setShowOrderModal(true);
    setOrderModalPage(1);
    setSelectedOrder(order);
  };

  //ConfirmModal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pageConfirmModal, setPageConfirmModal] = useState(null);
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const openConfirmModal = (pageName, order) => {
    setSelectedOrder(order);
    setPageConfirmModal(pageName);
    setShowConfirmModal(true);
  };

  //SuccessType
  const [successType, setSuccessType] = useState(null);
  console.log(orders);
  return (
    <>
      <ConfirmModalTemplate
        show={showConfirmModal}
        setShowOrderModal={setShowOrderModal}
        setShowConfirmModal={setShowConfirmModal}
        page={pageConfirmModal}
        setOrderModalPage={setOrderModalPage}
        cancel={closeConfirmModal}
        order={selectedOrder}
        fetchData={fetchData.bind(
          null,
          selectOrder,
          page,
          priceMin,
          priceMax,
          duration,
          sort
        )}
        successType={successType}
        setSuccessType={setSuccessType}
      />

      <OrderModalTemplate
        onClose={onCloseOrderModal}
        show={showOrderModal}
        orderType={selectOrder}
        userType={userType}
        page={orderModalPage}
        order={selectedOrder}
        openConfirmModal={openConfirmModal}
        closeConfirmModal={closeConfirmModal}
        successType={successType}
      />

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
          onReset={resetAllParams}
        />
        <Header>ออเดอร์ของฉัน</Header>
        <HeaderTwoContainer>
          {headerTwo.map((header, idx) => (
            <HeaderTwo
              key={idx}
              type="button"
              select={header.q === selectOrder}
              userType={authCtx.userInfo.user_type}
              onClick={onChangeHeaderHandler.bind(null, header.q)}
              disabled={isLoadingOrder}
            >
              {header.text}
            </HeaderTwo>
          ))}
        </HeaderTwoContainer>
        <InputSearchContainer>
          {" "}
          <InputSearch
            placeholder="ค้นหาคำขอที่นี่..."
            value={searchOrder}
            onChange={searchKeywordChangeHandler}
            onSubmit={onSearchKeywordHandler}
            filter
            onClickFilter={onOpenModalHandler}
          />
        </InputSearchContainer>
        <SortContainer>
          เรียงตาม
          <Select defaultValue={sort} onChange={onChangeSortHandler}>
            {sortOptions.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.text}
              </option>
            ))}
          </Select>
          <AddOrder
            src={AddOrderIcon}
            onClick={() => {
              navigate("/create-order-template");
            }}
          />
        </SortContainer>
        <OrderContainer>
          {isLoadingOrder && <LoadingDiv>loading...</LoadingDiv>}
          {!isLoadingOrder &&
            orders &&
            orders.map((order, idx) => (
              <OrderCard
                key={idx}
                header={order.title}
                description={order.description}
                customer={order.customer_name}
                freelance={
                  selectOrder !== "template" &&
                  (selectOrder !== "request" || userType !== 1)
                    ? order.freelance_name
                    : null
                }
                due_date={order.due_date}
                duration={order.duration}
                price={order.price}
                hasStatus={
                  selectOrder !== "template" &&
                  (selectOrder !== "request" || userType !== 1)
                }
                status={order.status}
                orderType={selectOrder}
                userType={userType}
                onClick={onClickCardHandler.bind(null, order)}
                order={order}
                openConfirmModal={openConfirmModal}
              />
            ))}
        </OrderContainer>
      </BG>
    </>
  );
};

export default MyOrderPage;
