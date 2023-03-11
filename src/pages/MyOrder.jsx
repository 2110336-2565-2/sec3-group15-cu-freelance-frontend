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
import "./MyOrder.css"

const BG = tw.div`h-[85vh] flex flex-col items-center font-ibm`;
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
            placeholder="ค้นหาคำขอที่นีั่..."
            filter
            onClickFilter={() => {
              console.log("GG");
            }}
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
          />
          <OrderCard
            header="ออกแบบโลโก้"
            description="ออกแบบโลโก้สำหรับธุรกิจการ จองที่พัก สีหลักคือชมพู..."
            name="JonathanT"
            day="2/10/2023"
            price="2000"
          />
        </OrderContainer>
      </BG>
    </>
  );
};

export default MyOrderPage;
