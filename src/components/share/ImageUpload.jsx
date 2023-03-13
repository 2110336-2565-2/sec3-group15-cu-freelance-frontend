import React, { useRef, useState, useEffect } from "react";
import CameraIcon from "../../assets/CameraIcon.svg";
import tw from "twin.macro";

const ImageUpload = (props) => {
  const styles = {
    button: () => [
      tw`p-2 text-white bg-[#D62B70] flex items-center gap-x-2 rounded-[10px]`,
    ],
    errorText: () => [
      tw`my-[1px] font-light text-red-700 text-xs`
    ],
  };

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(props.isValid);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    console.log(event.target.files.length)
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        multiple
      />
      <div>
        <div>{previewUrl && <img src={previewUrl} alt="Preview" />}</div>
        <button type="button" onClick={pickImageHandler} css={styles.button()}>
          <span>
            <img src={CameraIcon} />
          </span>
          {props.text}
        </button>
      </div>
      {!isValid && (
        <p
          css={styles.errorText()}
        >
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
