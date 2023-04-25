import FileUpload from "./FileUpload";
import React, { useState } from "react";
import tw, { styled } from "twin.macro";
import Filename from "./createPortfolioPage3/Filename";
import PortfolioModal from "./PortfolioModal";
import Button from "../share/Button";
import { headerTwoPort } from "../../store/portfolioForm";

const ContainUploadedFile = tw.div`flex flex-col max-h-[20vh] overflow-auto w-full gap-y-2`;
const ModalContent = tw.div`flex flex-col items-center justify-center w-full h-[80%]`;
const ButtonModal = tw.div`h-[7%] w-full flex justify-between px-[5%]`;
const FileUploadContainer = tw.div`h-[250px] w-full flex flex-col items-center`;
const ModalImage = tw.img`object-scale-down`;
const HeaderTwo = styled.button(({ userType, select }) => [
  tw`text-center cursor-pointer text-freelance-black-secondary w-1/2 mb-5`,
  select &&
    tw`border-b-2  border-freelance-black-primary text-freelance-black-primary`,
]);

const CreatePortForm3 = ({ inputHandler, formState }) => {
  if (!formState) {
    return;
  }
  const [file, setFile] = useState(formState.inputs.image.value);
  const [isValid, setIsValid] = useState(formState.inputs.image.isValid);
  const [isShow, setIsShow] = useState(false);
  const [preview, setPreview] = useState(null);

  const [fileThumbnail, setFileThumbnail] = useState(
    formState.inputs.thumbnail.value
  );
  const [isValidThumbnail, setIsValidThumbnail] = useState(
    formState.inputs.thumbnail.isValid
  );

  const [id, setId] = useState(null);
  const [namePreview, setNamePreview] = useState(null);
  const [q, setQ] = useState(1);

  const handleClickFile = (image, idx) => {
    setPreview(URL.createObjectURL(image));
    setId(idx);
    setNamePreview(image.name);
    setIsShow(true);
  };

  const handleCloseModal = () => {
    setPreview(null);
    setId(null);
    setNamePreview(null);
    setIsShow(false);
  };

  const handleDeleteFile = (idx) => {
    setPreview(null);
    setNamePreview(null);
    setIsShow(false);
    const newFile = file.filter((f, index) => index != idx);
    console.log(newFile);
    setFile(newFile);
    inputHandler("image", newFile, true);
  };

  const handleClickFileThumbnail = () => {
    setPreview(URL.createObjectURL(fileThumbnail[0]));
    setNamePreview(fileThumbnail[0].name);
    setIsShow(true);
  };

  const handleDeleteFileThumbnail = () => {
    setPreview(null);
    setNamePreview(null);
    setIsShow(false);
    setFileThumbnail([]);
    inputHandler("thumbnail", [], false);
    setIsValidThumbnail(false);
  };
  const modalContent = (
    <>
      <ModalContent>
        <div tw="font-bold">{namePreview}</div>
        <ModalImage src={preview} />
      </ModalContent>
      <ButtonModal>
        <Button secondary onClick={handleCloseModal} width="40%">
          ย้อนกลับ
        </Button>
        <Button
          primary
          onClick={
            q === 2
              ? handleDeleteFile.bind(null, id)
              : handleDeleteFileThumbnail
          }
          width="40%"
        >
          ลบรูป
        </Button>
      </ButtonModal>
    </>
  );

  const onChangeHeaderHandler = (q) => {
    setQ(q);
  };
  console.log(isValidThumbnail);
  return (
    <div tw="w-[90%] h-[57vh] flex flex-col items-center gap-y-2">
      <div tw="w-full flex">
        {headerTwoPort.map((header, idx) => (
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
      {preview && (
        <PortfolioModal
          show={isShow}
          onClose={handleCloseModal}
          header="เเก้ไขพอร์ตโฟลิโอ"
          content={modalContent}
        />
      )}
      {q === 1 && (
        <>
          {fileThumbnail.length === 0 && (
            <FileUploadContainer>
              {" "}
              <FileUpload
                accept="image/jpg,image/jpeg,image/png"
                onInput={inputHandler}
                id="thumbnail"
                errorText="โปรดอัพโหลดรูปภาพปก 1 รูป"
                text="เลือกรูปภาพหน้าปกที่จะอัพโหลด"
                file={fileThumbnail}
                setFile={setFileThumbnail}
                isValid={isValidThumbnail}
                setIsValid={setIsValidThumbnail}
                text2={""}
              />
            </FileUploadContainer>
          )}
          {fileThumbnail.length !== 0 && (
            <Filename
              name={fileThumbnail[0].name}
              onClick={handleClickFileThumbnail}
              onClickDelete={handleDeleteFileThumbnail}
            />
          )}
        </>
      )}
      {q === 2 && (
        <>
          <FileUploadContainer>
            {" "}
            <FileUpload
              accept="image/*"
              onInput={inputHandler}
              id="image"
              errorText="โปรดอัพโหลดรูปภาพอย่างน้อย 1 รูป"
              text="เลือกรูปภาพที่จะอัพโหลด"
              file={file}
              setFile={setFile}
              isValid={isValid}
              setIsValid={setIsValid}
              text2={"(ไม่รวมปก)"}
              multiple={true}
            />
          </FileUploadContainer>

          <ContainUploadedFile>
            {file.map((image, idx) => (
              <Filename
                key={idx}
                name={image.name}
                onClick={handleClickFile.bind(null, image, idx)}
                onClickDelete={handleDeleteFile.bind(null, idx)}
              />
            ))}
          </ContainUploadedFile>
        </>
      )}
    </div>
  );
};

export default CreatePortForm3;
