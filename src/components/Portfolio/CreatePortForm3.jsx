import FileUpload from "./FileUpload";
import React, { useState } from "react";
import tw from "twin.macro";
import Filename from "./createPortfolioPage3/Filename";
import PortfolioModal from "./PortfolioModal";
import Button from "../share/Button";

const ContainUploadedFile = tw.div`flex flex-col max-h-[20vh] overflow-auto w-full gap-y-2`;
const ModalContent = tw.div`flex flex-col items-center justify-center w-full h-[80%]`;
const ButtonModal = tw.div`h-[7%] w-full flex justify-between px-[5%]`;
const ModalImage = tw.img`object-scale-down`;

const CreatePortForm3 = ({ inputHandler, formState }) => {
  if (!formState) {
    return;
  }
  const [file, setFile] = useState(formState.inputs.image.value);
  const [isValid, setIsValid] = useState(formState.inputs.image.isValid);
  const [isShow, setIsShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [id, setId] = useState(null);
  const [namePreview, setNamePreview] = useState(null);

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
    let isValid = true;
    if (newFile.length === 0) {
      setIsValid(false);
      isValid = false;
    }
    setFile(newFile);
    inputHandler("image", newFile, isValid);
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
        <Button primary onClick={handleDeleteFile.bind(null, id)} width="40%">
          ลบรูป
        </Button>
      </ButtonModal>
    </>
  );

  return (
    <div tw="w-[90%] h-[50vh]">
      {preview && (
        <PortfolioModal
          show={isShow}
          onClose={handleCloseModal}
          header="เเก้ไขพอร์ตฟอลิโอ"
          content={modalContent}
        />
      )}
      <FileUpload
        accept="image/*"
        onInput={inputHandler}
        id="image"
        errorText="โปรดอัพโหลดรูปภาพอย่างน้อย 1 รูป"
        text="เลือกภาพที่จะอัพโหลด"
        file={file}
        setFile={setFile}
        isValid={isValid}
        setIsValid={setIsValid}
      />
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
    </div>
  );
};

export default CreatePortForm3;
