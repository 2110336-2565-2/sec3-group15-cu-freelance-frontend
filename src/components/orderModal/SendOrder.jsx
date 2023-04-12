import tw from "twin.macro";
import FileUpload from "../Portfolio/FileUpload";
import React, { useState } from "react";
import Filename from "../Portfolio/createPortfolioPage3/Filename";
import Button from "../share/Button";
import PortfolioModal from "../Portfolio/PortfolioModal";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const Container = tw.div`w-[90%] mx-auto h-auto flex flex-col gap-y-5 min-h-[85%]`;
const ButtonContainer = tw.div`w-[90%] mx-auto flex justify-between`;
const Header = tw.div`font-bold w-full `;
const UploadContainer = tw.div`w-full  h-[200px] flex items-center flex-col`;
const FilenameContainer = tw.div`flex flex-col gap-y-3 max-h-[220px] dt:max-h-[200px] overflow-y-auto`;
const ModalContent = tw.div`flex flex-col items-center justify-center w-full h-[85%] mb-2  mx-auto`;
const ButtonModal = tw.div`h-[7%] w-full flex justify-between px-[5%]`;
const ModalImage = tw.img`object-scale-down h-[70%]`;

const SendOrder = ({ onClose, handleConfirmSend, formState, inputHandler }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [files, setFiles] = useState(formState.inputs.files.value);
  const [isValid, setIsValid] = useState(formState.inputs.files.isValid);
  const [isShow, setIsShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [namePreview, setNamePreview] = useState(null);
  const [typePreview, setTypePreview] = useState(null);
  const [id, setId] = useState(null);

  const handleClickFile = (file, idx) => {
    setPreview(URL.createObjectURL(file));
    setTypePreview(file.type);
    setId(idx);
    setNamePreview(file.name);
    setIsShow(true);
    // console.log($("#iframeMob").attr("src", URL.createObjectURL(file)));
  };
  const handleDeleteFile = (idx) => {
    setPreview(null);
    setNamePreview(null);
    setIsShow(false);
    const newFile = files.filter((f, index) => index != idx);
    console.log(newFile);
    setFiles(newFile);
    setIsValid(newFile.length !== 0);
    inputHandler("files", newFile, newFile.length !== 0);
  };
  const handleCloseModal = () => {
    setPreview(null);
    setId(null);
    setNamePreview(null);
    setIsShow(false);
    setTypePreview(null);
  };
  console.log(preview);
  const modalContent = (
    <>
      <ModalContent>
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
      </ModalContent>
      <ButtonModal>
        <Button secondary onClick={handleCloseModal} width="40%">
          ย้อนกลับ
        </Button>
        <Button primary onClick={handleDeleteFile.bind(null, id)} width="40%">
          ลบไฟล์
        </Button>
      </ButtonModal>
    </>
  );

  return (
    <>
      {" "}
      {preview && (
        <PortfolioModal
          show={isShow}
          onClose={handleCloseModal}
          header="เเสดงตัวอย่างงาน"
          content={modalContent}
        />
      )}
      <Container>
        <Header>อัพโหลดงานของคุณ</Header>
        <UploadContainer>
          <FileUpload
            accept="image/png,image/jpg,image/jpeg,application/pdf,application/vnd.ms-excel"
            onInput={inputHandler}
            id="files"
            errorText="โปรดอัพโหลดไฟล์อย่างน้อย 1 ไฟล์"
            text="เลือกไฟล์ที่จะอัพโหลด"
            file={files}
            setFile={setFiles}
            isValid={isValid}
            setIsValid={setIsValid}
            text2={""}
            multiple={true}
          />
        </UploadContainer>
        <FilenameContainer>
          {files.map((file, idx) => (
            <Filename
              key={idx}
              name={file.name}
              onClick={handleClickFile.bind(null, file, idx)}
              onClickDelete={handleDeleteFile.bind(null, idx)}
            />
          ))}
        </FilenameContainer>
      </Container>
      <ButtonContainer>
        <Button secondary onClick={onClose} width="40%">
          ย้อนกลับ
        </Button>
        <Button
          primary
          onClick={handleConfirmSend}
          width="40%"
          disable={!isValid}
        >
          ส่งงาน
        </Button>
      </ButtonContainer>
    </>
  );
};

export default SendOrder;
