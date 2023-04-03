import tw from "twin.macro";
import DeleteIcon from "../../../assets/CreatePort/DeleteIcon.svg";
import React from "react";

const Container = tw.div`w-full flex justify-between items-center`;
const Name = tw.div`hover:text-blue-600 cursor-pointer`;
const DeleteImg = tw.img`cursor-pointer`;

const Filename = ({ name, onClick, onClickDelete }) => {
  return (
    <>
      <Container>
        <Name onClick={onClick}>{name}</Name>
        <DeleteImg src={DeleteIcon} onClick={onClickDelete} />
      </Container>
      <hr tw="bg-freelance-pink" />
    </>
  );
};
export default Filename;
