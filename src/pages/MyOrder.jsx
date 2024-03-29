import tw, { styled } from "twin.macro";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/share/Navbar";
import { useSearchParams } from "react-router-dom";
import PaginationBar from "../components/share/PaginationBar";
import {
  headerFreelance,
  headerCustomer,
  sortOptions,
} from "../store/myOrder-store";
import InputSearch from "../components/share/InputSearch";
import AddOrderIcon from "../assets/AddOrder.svg";

import OrderCard from "../components/share/OrderCard";
import "./MyOrder.css";
import { useWindow } from "../hooks/window-hook";

//Filter Import
import FilterModal from "../components/share/FilterModal";
import TemplateFilter from "../components/searchPage/TemplateFilter";
import PriceFilter from "../components/searchPage/PriceFilter";
import DurationFilter from "../components/searchPage/DurationFilter";
import FilterButton from "../components/searchPage/FilterButton";

import { useForm } from "../hooks/form-hook";

import { apiClient } from "../utils/axios";

import {
  durationOptions,
  statusOptions,
  statusRequest,
  statusRequestFreelance,
} from "../store/search-store";
import OrderModalTemplate from "../components/share/OrderModalTemplate";
// import ConfirmModal from "../components/share/ConfirmModal";
import ConfirmModalTemplate from "../components/share/ConfirmModalTemplate";
import LoadingSpinner from "../components/share/LoadingSpinner";
import OrderCarousel from "../components/order/OrderCarousel";
import Button from "../components/share/Button";
import { OrderContext } from "../context/OrderProvider";

const BG = tw.div`inline dt:flex w-full dt:w-[90%] max-w-[1200px] mx-auto`;
const Header = tw.div`text-mobile-h1 dt:text-desktop-h1 font-bold my-4`;
const ContentWrapper = tw.div`min-h-[85vh]  dt:h-fit w-[90%] mx-auto dt:w-[70%] dt:min-h-[80vh] relative flex flex-col items-center font-ibm`;
const HeaderTwoContainer = tw.div`text-mobile-h2 dt:text-desktop-h2 flex justify-center w-full mx-auto my-5`;
const InputSearchContainer = tw.div`h-[40px] w-full mx-auto my-4`;
const SortContainer = tw.div`flex justify-between items-center w-full mx-auto text-mobile-h2 dt:text-desktop-h2 mb-4`;
const Select = tw.select`h-[30px] w-2/3 border border-[#BCBCBC] focus:outline-none rounded-lg text-mobile-body dt:text-desktop-base px-2`;
const AddOrder = tw.img``;
const OrderContainer = tw.div`flex flex-nowrap  w-full dt:min-h-[68vh] overflow-y-hidden max-w-full overflow-auto p-4 dt:overflow-hidden dt:gap-x-[3%] dt:flex-wrap  dt:p-2 dt:justify-start dt:gap-y-2`;
const LoadingDiv = tw.div`font-ibm`;
const Filterbar = tw.div`min-h-[42px] text-mobile-h2 font-ibm font-medium text-freelance-black-secondary`;

const HeaderTwo = styled.button(({ userType, select }) => [
  tw`text-center cursor-pointer text-freelance-black-secondary`,
  userType === 1 && tw`w-1/2`,
  userType === 2 && tw`w-1/3`,
  select &&
    tw`border-b-2  border-freelance-black-primary text-freelance-black-primary`,
]);
const MyOrderPage = () => {
  //windowSize
  const windowSize = useWindow();
  const carouselRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const orderCtx = useContext(OrderContext);
  const userType = authCtx.userInfo.user_type;
  // console.log(authCtx.userInfo.user_type);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [formState, inputHandler] = useForm(
    {
      files: {
        value: [],
        isValid: false,
      },
    },
    false
  );

  //InfiniteScroll or Pagination
  const pageRef = React.createRef();
  const page = searchParams.get("pages") || "1";

  //header-type
  const selectOrder = searchParams.get("q");
  const onChangeHeaderHandler = (name) => {
    searchParams.set("q", name);
    setSearchParams(searchParams);
    onResetPage();
    resetAllParams();
  };

  //searchOrder
  const [searchOrderResult, setSearchOrderResult] = useState(
    searchParams.get("keyword") || ""
  );

  const searchOrderResultChangeHandler = (e) => {
    setSearchOrderResult(e.target.value);
  };

  const submitResultHandler = (e) => {
    e.preventDefault();
    setSelected("keyword", searchOrderResult);
    onResetPage();
  };

  const searchOrder = searchParams.get("keywords") || "";

  const submitMBResultHandler = (e) => {
    setSearchOrderResult(e.target.value);
    setSelected("keyword", e.target.value);
    onResetPage();
  };

  const onNextPageHandler = (e) => {
    e.preventDefault();
    searchParams.set("pages", parseInt(page) + 1);
    setSearchParams(searchParams);
  };

  const onPrevPageHandler = (e) => {
    e.preventDefault();
    searchParams.set("pages", parseInt(page) - 1);
    setSearchParams(searchParams);
  };

  const onSetPageHandler = (event) => {
    event.preventDefault();
    const inputPage = parseInt(pageRef.current.value);
    const totalPage = parseInt(meta.TotalPage);
    pageRef.current.value = "";
    pageRef.current.blur();
    if (inputPage > totalPage) searchParams.set("pages", totalPage);
    else if (inputPage < 1) searchParams.set("pages", 1);
    else searchParams.set("pages", inputPage);
    setSearchParams(searchParams);
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
    setOrders(null);
    if (carouselRef.current) {
      if (carouselRef.current.swiper)
        carouselRef.current.swiper.slideTo(0, 1000);
    }
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
      4: false,
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
    setSelected(
      "min_price",
      parseInt(priceShow.min) <= 0 ? "1" : priceShow.min
    );
    setSelected(
      "max_price",
      parseInt(priceShow.max) <= 0 ? "100000" : priceShow.max
    );
    if (parseInt(priceShow.min) < 0) {
      setPriceShow((prev) => ({ ...prev, min: "0" }));
    }
    if (parseInt(priceShow.max) < 0) {
      setPriceShow((prev) => ({ ...prev, max: "100000" }));
    }
    setShowModal(false);
  };

  const onSubmitPriceHandler2 = () => {
    setSelected(
      "min_price",
      parseInt(priceShow.min) <= 0 ? "1" : priceShow.min
    );
    setSelected(
      "max_price",
      parseInt(priceShow.max) <= 0 ? "100000" : priceShow.max
    );
    if (parseInt(priceShow.min) < 0) {
      setPriceShow((prev) => ({ ...prev, min: "0" }));
    }
    if (parseInt(priceShow.max) < 0) {
      setPriceShow((prev) => ({ ...prev, max: "100000" }));
    }
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
    sort,
    keyword,
    status
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
        status:
          status !== ""
            ? status
            : selectOrder === "request" && userType === 1
            ? "2,4"
            : null,
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
      let responseOrders,
        avatarsId = null,
        resultOrders = [];
      if (selectOrder === "template")
        responseOrders = response.data.order_templates;
      else if (selectOrder === "request")
        responseOrders = response.data.requests;
      else responseOrders = response.data.orders;

      console.log(responseOrders);

      if (userType === 1)
        avatarsId = responseOrders.map((order) => order.customer_id);
      else if (userType === 2 && selectOrder !== "template")
        avatarsId = responseOrders.map((order) => order.freelance_id);

      console.log(avatarsId);

      const responseAvatar2 = await apiClient.get(
        `/file/avatar?id=${avatarsId}`
      );
      console.log(responseAvatar2.data);

      resultOrders = responseOrders.map((order) => {
        if (!avatarsId) return order;
        else {
          let idx;
          if (userType === 1)
            idx = responseAvatar2.data.avatars.findIndex(
              (resAV2) => resAV2.userId === order.customer_id
            );
          else
            idx = responseAvatar2.data.avatars.findIndex(
              (resAV2) => resAV2.userId === order.freelance_id
            );
          return { ...order, avatar2: responseAvatar2.data.avatars[idx].url };
        }
      });

      if (windowSize >= 850 || page === "1" || !orders) {
        setOrders(resultOrders);
      } else {
        setOrders((prev) => [...prev, ...resultOrders]);
      }
      const responseAvatar = await apiClient.get(
        `/file/avatar?id=${authCtx.userInfo.id}`
      );
      setAvatar(responseAvatar.data.avatars[0].url);
      setMeta(response.data.meta);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingOrder(false);
  };
  useEffect(() => {
    fetchData(
      selectOrder,
      page,
      priceMin,
      priceMax,
      duration,
      sort,
      searchOrder,
      status
    );
  }, [
    selectOrder,
    // keyword,
    page,
    priceMin,
    priceMax,
    duration,
    sort,
    status,
  ]);

  //FilterModal
  const [showModal, setShowModal] = useState(false);
  const onCloseModalHandler = () => {
    document.body.style.overflow = "";
    setShowModal(false);
  };
  const onOpenModalHandler = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const onCancelDurationHandler = (name) => {
    console.log(name);
    setShowDuration((prev) => ({
      ...prev,
      [name]: false,
    }));
    let value = "";
    for (let duration in showDuration) {
      if (parseInt(duration) !== name && showDuration[duration] === true) {
        value += duration + ",";
      }
    }
    if (value !== "") {
      value = value.slice(0, value.length - 1);
    }
    setSelected("duration", value);
    onResetPage();
  };
  const FilterContent = (
    <div tw="h-[90%] dt:h-full dt:px-2 dt:pt-10 dt:w-[25%] overflow-y-auto overflow-x-hidden font-ibm">
      {windowSize >= 850 && (
        <Filterbar>
          เเสดงผลลัพธ์เฉพาะ
          <div tw="flex flex-wrap gap-2 items-center ">
            {duration !== "" &&
              duration
                .split(",")
                .map((d, idx) => (
                  <FilterButton
                    key={idx}
                    text={`${d} วัน`}
                    onClick={onCancelDurationHandler.bind(null, parseInt(d))}
                  />
                ))}
          </div>
        </Filterbar>
      )}
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
              key={idx}
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
              key={idx}
              onChange={onChangeStatusHandler}
              showDuration={showStatus}
            />
          ))}
        </TemplateFilter>
      )}
      {selectOrder === "request" && userType === 1 && (
        <TemplateFilter header="สถานะ">
          {statusRequestFreelance.map((option, idx) => (
            <DurationFilter
              value={option.value}
              text={option.text}
              key={idx}
              onChange={onChangeStatusHandler}
              showDuration={showStatus}
            />
          ))}
        </TemplateFilter>
      )}
    </div>
  );

  //OrderModalTemplate
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalPage, setOrderModalPage] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const onCloseOrderModal = () => {
    setShowOrderModal(false);
    if (selectOrder === "order" && userType === 1)
      inputHandler("files", [], false);
  };
  const onClickCardHandler = (order) => {
    setShowOrderModal(true);
    setOrderModalPage(1);
    setSelectedOrder(order);
  };

  const handleClickSendWork = (order) => {
    setShowOrderModal(true);
    setOrderModalPage(4);
    setSelectedOrder(order);
  };

  const handleClickReceiveWork = (order) => {
    setShowOrderModal(true);
    setOrderModalPage(5);
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

  const handleInfiniteScrollNextPage = () => {
    if (page < meta.TotalPage) {
      searchParams.set("pages", parseInt(page) + 1);
      setSearchParams(searchParams);
    }
  };
  useEffect(() => {
    onResetPage();
  }, [windowSize]);
  return (
    <>
      <ConfirmModalTemplate
        formState={formState}
        inputHandler={inputHandler}
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
          sort,
          null,
          status
        )}
        successType={successType}
        setSuccessType={setSuccessType}
        handleResetPage={onResetPage}
      />

      <OrderModalTemplate
        formState={formState}
        inputHandler={inputHandler}
        onClickSendWork={handleClickSendWork.bind(null, selectedOrder)}
        onClickReceiveWork={handleClickReceiveWork.bind(null, selectedOrder)}
        onClose={onCloseOrderModal}
        show={showOrderModal}
        orderType={selectOrder}
        userType={userType}
        page={orderModalPage}
        setOrderModalPage={setOrderModalPage}
        setSelectedOrder={setSelectedOrder}
        order={selectedOrder}
        openConfirmModal={openConfirmModal}
        closeConfirmModal={closeConfirmModal}
        successType={successType}
        setSuccessType={setSuccessType}
        fetchData={fetchData.bind(
          null,
          selectOrder,
          page,
          priceMin,
          priceMax,
          duration,
          sort,
          null,
          status
        )}
      />

      <Navbar
        placeholder="ค้นหาออเดอร์ของฉัน"
        login={!!authCtx.acToken}
        search
        searchResult={searchOrderResult}
        onChange={searchOrderResultChangeHandler}
        onSubmit={submitResultHandler}
      />
      <FilterModal
        content={FilterContent}
        show={showModal}
        onClose={onCloseModalHandler}
        textBLeft="รีเซ็ต"
        textBRight="เรียบร้อย"
        onSubmitPrice={onSubmitPriceHandler2}
        onReset={resetAllParams}
      />
      <BG>
        {windowSize >= 850 && FilterContent}
        <ContentWrapper>
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
          {windowSize < 850 && (
            <InputSearchContainer>
              {" "}
              <InputSearch
                placeholder="ค้นหาคำขอที่นี่..."
                value={searchOrderResult}
                onChange={submitMBResultHandler}
                onSubmit={submitResultHandler}
                filter
                onClickFilter={onOpenModalHandler}
              />
            </InputSearchContainer>
          )}
          <SortContainer>
            <div tw="w-3/5 dt:w-2/5 flex justify-between">
              เรียงตาม
              <Select defaultValue={sort} onChange={onChangeSortHandler}>
                {sortOptions.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Select>
            </div>
            {selectOrder === "template" ? (
              windowSize >= 850 ? (
                <Button
                  primary
                  onClick={() => {
                    orderCtx.clickCreateTemplate("order");
                    navigate("/create-order-template");
                  }}
                >
                  เพิ่มออเดอร์
                </Button>
              ) : (
                <AddOrder
                  src={AddOrderIcon}
                  onClick={() => {
                    navigate("/create-order-template");
                  }}
                />
              )
            ) : null}
          </SortContainer>
          {windowSize < 850 && (
            <OrderCarousel
              avatar={avatar}
              orders={orders}
              isLoading={isLoadingOrder}
              handleInfiniteScroll={handleInfiniteScrollNextPage}
              selectOrder={selectOrder}
              userType={userType}
              openConfirmModal={openConfirmModal}
              onClickCardHandler={onClickCardHandler}
              ref={carouselRef}
              onClickSendWork={handleClickSendWork}
            />
          )}
          {windowSize >= 850 && (
            <OrderContainer>
              {isLoadingOrder && <LoadingSpinner />}
              {!isLoadingOrder && !orders && <LoadingDiv>No result</LoadingDiv>}
              {!isLoadingOrder &&
                orders &&
                orders.map((order) => (
                  <OrderCard
                    avatar={avatar}
                    avatar2={order.avatar2}
                    key={order.id}
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
                    hasStatus={selectOrder !== "template"}
                    status={order.status}
                    orderType={selectOrder}
                    userType={userType}
                    onClick={onClickCardHandler.bind(null, order)}
                    onClickSendWork={handleClickSendWork.bind(null, order)}
                    order={order}
                    openConfirmModal={openConfirmModal}
                  />
                ))}
            </OrderContainer>
          )}
          {windowSize >= 850 && orders && meta && meta.TotalPage !== 1 && (
            <PaginationBar
              page={page}
              ref={pageRef}
              totalPage={meta.TotalPage}
              onPrev={onPrevPageHandler}
              onNext={onNextPageHandler}
              onSet={onSetPageHandler}
            />
          )}
        </ContentWrapper>
      </BG>
    </>
  );
};

export default MyOrderPage;
