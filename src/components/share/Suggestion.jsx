import tw, { styled } from "twin.macro";
import React from "react";
import searchIcon from "../../assets/SearchIcon.svg";
const Container = tw.div`flex flex-row gap-x-2 w-full bg-white hover:bg-gray-200 z-[70] `;
const SearchLogo = tw.img`ml-2`;
const Text = styled.div(({ def }) => [
  tw`font-ibm text-mobile-small dt:text-desktop-base z-50`,
  def && tw`text-center ml-4 items-center self-center`,
]);
const Suggestion = ({ text, onClick, def }) => {
  return (
    <>
      {def ? (
        <Container>
          <Text def>ไม่มีพอร์ตที่ตรงกับคำค้นหาของคุณ</Text>
        </Container>
      ) : (
        <Container onClick={onClick}>
          <SearchLogo src={searchIcon} />
          <Text>{text}</Text>
        </Container>
      )}
    </>
  );
};
export default Suggestion;
