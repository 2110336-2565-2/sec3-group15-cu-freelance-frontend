import React, { useRef, useState, useEffect } from "react";
import FileUploadIcon from "../../assets/CreatePort/FileUploadIcon.svg";
import tw from "twin.macro";

const styles = {
  errorText: ({ isValid }) => [
    tw`my-[1px] font-light text-red-700 text-xs`,
    isValid && tw`hidden`,
  ],
};

const Container = tw.div`w-full h-2/3 border-dashed border-2 border-freelance-pink rounded-[20px] flex justify-center items-center mb-2`;
const UploadButton = tw.div`w-fit h-fit flex flex-col items-center justify-between cursor-pointer`;
const UploadPic = tw.img``;
const UploadText = tw.text`font-bold text-freelance-black-primary`;

const FileUpload = ({
  accept,
  onInput,
  id,
  errorText,
  text,
  file,
  setFile,
  isValid,
  setIsValid,
  text2,
  multiple = false,
}) => {
  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    const files = Array.prototype.slice.call(event.target.files);
    const uploaded = [...file];
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length >= 1) {
      files.some((file) => {
        uploaded.push(file);
      });
      setFile(uploaded);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, uploaded, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <>
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept={accept}
        onChange={pickedHandler}
        onClick={(event) => {
          event.target.value = null;
        }}
        multiple={multiple}
      />
      <Container>
        <UploadButton onClick={pickImageHandler}>
          <UploadPic src={FileUploadIcon} alt="uploadIcon" />
          <UploadText>{text}</UploadText>
          <UploadText>{text2}</UploadText>
        </UploadButton>
      </Container>
      {!isValid && (
        <p css={styles.errorText({ isValid: isValid })}>{errorText}</p>
      )}
    </>
  );
};

export default FileUpload;
