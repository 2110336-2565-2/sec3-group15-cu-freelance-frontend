import tw from "twin.macro";
import ImageCarousel from "./ImageCarousel";
import Input from "../share/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_PRICE } from "../share/Validate";
import { DUMMY_options } from "../../store/portfolioForm";
import { useForm } from "../../hooks/form-hook";
import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../share/LoadingSpinner";
import { apiClient } from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import ContainRadio from "./ContainRadio";
import { authClient } from "../../utils/auth";
import LoadingModal from "../share/LoadingModal";
import DeleteIcon from "../../assets/CreatePort/DeleteIcon.svg";
import SubmitIcon from "../../assets/CreatePort/SubmitIcon.svg";
import Button from "../share/Button";
import { delay } from "../../utils/delay";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Container = tw.div`font-ibm w-full mx-auto h-auto overflow-y-auto flex flex-col items-center`;
const InputContainer = tw.div`w-[90%] flex flex-col items-center`;
const Header = tw.div`font-bold text-xl`;
const ButtonContainer = tw.div`w-[90%] flex justify-between`;

const EditPortfolioform = () => {
  const authCtx = useContext(AuthContext);
  const fileRef = useRef(null);
  const [portfolio, setPortfolio] = useState(null);
  const [selectIdx, setSelectIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidImg, setIsValidImg] = useState(true);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowSubmit, setIsShowSubmit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const params = useParams();
  const id = params.portId;
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);
  const [formState, inputHandler, setFormData] = useForm({
    portfolioName: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    price: {
      value: "",
      isValid: false,
    },
    category: {
      value: "",
      isValid: false,
    },
    duration: {
      value: "",
      isValid: false,
    },
  });
  // console.log(isPublic);
  const handleClickIsPublic = () => {
    setIsPublic((prev) => !prev);
  };

  const handleClickSubmit = () => {
    setIsShowSubmit(true);
  };

  const handleCancelSubmit = () => {
    setIsShowSubmit(false);
  };

  const onSubmitHandler = async (event) => {
    const { portfolioName, description, category, price, duration } =
      formState.inputs;
    try {
      setIsLoadingSubmit(true);
      let data = JSON.stringify({
        category: category.value,
        description: description.value,
        price: parseFloat(price.value),
        duration: parseInt(duration.value),
        is_public: isPublic,
        name: portfolioName.value,
        userID: authCtx.userInfo.id,
      });
      console.log(data);
      const response = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      navigate(-1, { replace: true });
    } catch (err) {
      console.log(err);
    }
    setIsLoadingSubmit(false);
  };

  const handleSwiper = (idx) => {
    setSelectIdx(idx);
    console.log(idx);
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    setIsShowDelete(true);
  };

  const handleCancelDelete = () => {
    setIsShowDelete(false);
  };

  const handleDelete = async () => {
    if (previewImages.length === 1) {
      setIsValidImg(false);
      setIsLoadingDelete(false);
      setIsShowDelete(false);
      return;
    }
    setIsValidImg(true);
    try {
      setIsLoadingDelete(true);
      console.log(previewImages[selectIdx]);
      console.log(previewImages[selectIdx].split(".net/")[1]);
      const data = JSON.stringify({
        key: previewImages[selectIdx].split(".net/")[1],
      });
      console.log(data);
      const res = await apiClient.delete(`/file/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      setPreviewImages(previewImages.filter((image, idx) => idx !== selectIdx));
      setSelectIdx(0);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingDelete(false);
    setIsShowDelete(false);
  };

  const handleAddFileClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  const handleSelectImage = async (e) => {
    console.log(e.target.files);
    const files = Array.prototype.slice.call(e.target.files);
    if (files.length < 1) return;
    setIsLoadingAdd(true);
    setPreviewImages(null);
    try {
      files.some(async (file) => {
        const data = new FormData();
        data.append("file", file);
        const res = await apiClient.put(`/file/portfolio/${id}`, data);
        console.log(res);
      });
      await delay(1000);
      const res_img = await authClient.get(`/file/portfolio/${id}`);
      console.log(res_img.data);
      setPreviewImages(res_img.data.urls);
    } catch (err) {
      console.log(err);
    }
    setIsLoadingAdd(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/portfolio/me/${id}`);
        // console.log(response.data);
        const res_img = await authClient.get(`/file/portfolio/${id}`);
        // console.log(res_img.data);
        setFormData(
          {
            portfolioName: {
              value: response.data.portfolio.name,
              isValid: true,
            },
            price: {
              value: response.data.portfolio.price,
              isValid: true,
            },
            description: {
              value: response.data.portfolio.description,
              isValid: true,
            },

            category: {
              value: response.data.portfolio.category,
              isValid: true,
            },
            duration: {
              value: response.data.portfolio.duration,
              isValid: true,
            },
          },
          true
        );
        setPortfolio(response.data.portfolio);
        setPreviewImages(res_img.data.urls);
        console.log(response.data);
        setIsPublic(response.data.portfolio.is_public);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  console.log(isPublic);
  return (
    <>
      <LoadingModal
        pic={
          isLoadingDelete ? null : (
            <img src={DeleteIcon} tw="w-[30px] h-[30px]" />
          )
        }
        onCancel={isLoadingDelete ? null : handleCancelDelete}
        show={isShowDelete}
        header={isLoadingDelete ? "กำลังลบรูปภาพ" : "ยืนยันการลบรูปภาพ"}
        desc={
          isLoadingDelete
            ? "เรากำลังลบรูปภาพของคุณออกจากพอร์ตฟอลิโอนี้"
            : "หากลบรูปภาพแล้วจะไม่สามารถย้อนกลับได้"
        }
        footer={
          isLoadingDelete ? null : (
            <div tw="w-[80%] flex justify-between">
              <Button secondary width="40%" onClick={handleCancelDelete}>
                ยกเลิก
              </Button>
              <Button primary width="40%" onClick={handleDelete}>
                ยืนยัน
              </Button>
            </div>
          )
        }
      />
      <LoadingModal
        pic={
          isLoadingDelete ? null : (
            <img src={SubmitIcon} tw="w-[30px] h-[30px]" />
          )
        }
        onCancel={isLoadingSubmit ? null : handleCancelSubmit}
        show={isShowSubmit}
        header={
          isLoadingSubmit
            ? "กำลังสร้างพอร์ตฟอลิโอ"
            : "ยืนยันการสร้างพอร์ตฟอลิโอ"
        }
        desc={
          isLoadingSubmit
            ? "เรากำลังสร้างฟอร์ตฟอลิโอของคุณ"
            : "หากคุณยืนยันการสร้างพอร์ตฟอลิโอแล้ว ถ้าไม่ได้ปิดการมองเห็น ผู้ว่าจ้างจะสามารถเห็นพอร์ตฟอลิโอได้"
        }
        footer={
          isLoadingSubmit ? null : (
            <div tw="w-[80%] flex justify-between">
              <Button secondary width="40%" onClick={handleCancelSubmit}>
                ยกเลิก
              </Button>
              <Button primary width="40%" onClick={onSubmitHandler}>
                ยืนยัน
              </Button>
            </div>
          )
        }
      />
      <LoadingModal
        show={isLoadingAdd}
        header={"กำลังเพิ่มรูปภาพ"}
        desc={"เรากำลังเพิ่มรูปภาพของคุณเข้าไปในพอร์ตฟอลิโอนี้"}
      />
      {isLoading && (
        <div tw="w-full h-[30px]">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && portfolio && (
        <Container>
          <Header>เเก้ไขพอร์ตฟอลิโอ</Header>
          <InputContainer>
            {" "}
            <Input
              type="text"
              id="portfolioName"
              label="หัวข้อพอร์ตฟอลิโอ"
              placeholder="ใส่หัวข้องพอร์ตฟอลิโอที่นี่..."
              errorText="โปรดกรอกหัวข้อพอร์ตฟอลิโอ"
              onInput={inputHandler}
              initialValue={portfolio.name}
              initialValid={true}
              validator={[VALIDATOR_REQUIRE()]}
              required
            />
            <div tw="min-h-[300px] w-full">
              <Input
                type="textarea"
                id="description"
                label="รายละเอียดพอร์ตโฟลิโอ"
                placeholder="ใส่รายละเอียดพอร์ตฟอลิโอที่นี่..."
                errorText="โปรดกรอกรายละเอียด"
                onInput={inputHandler}
                initialValue={portfolio.description}
                initialValid={true}
                validator={[VALIDATOR_REQUIRE()]}
                required
              />
            </div>
            <Input
              type="select"
              id="category"
              label="หมวดหมู่"
              options={DUMMY_options}
              onInput={inputHandler}
              errorText="โปรดเลือกหมวดหมู่"
              initialValue={portfolio.category}
              initialValid={true}
              validator={[VALIDATOR_REQUIRE()]}
              required
            />
            <Input
              type="number"
              id="price"
              label="ราคา(บาท)"
              placeholder="ใส่ราคาที่นี่..."
              errorText="โปรดกรอกราคา"
              onInput={inputHandler}
              initialValue={portfolio.price}
              initialValid={true}
              validator={[VALIDATOR_REQUIRE(), VALIDATOR_PRICE()]}
              min="0"
              step=".01"
              required
            />
            <ContainRadio
              id="duration"
              onInput={inputHandler}
              errorText={"โปรดระบุระยะเวลา"}
              initialValue={portfolio.duration}
              initialValid={true}
            />
          </InputContainer>

          <div tw="flex flex-col w-full items-center">
            <div tw="w-[90%] my-2">
              รูปภาพ(รวมรูปภาพหน้าปก) <span tw="text-red-700 ">*</span>
            </div>

            {!isLoadingDelete && !isLoadingAdd && previewImages && (
              <div tw="w-full h-[200px]">
                <ImageCarousel
                  images={previewImages}
                  onSwiperImg={handleSwiper}
                />
              </div>
            )}
            {!isValidImg && (
              <div tw="my-[1px] font-light text-red-700 text-xs font-ibm">
                ต้องมีอย่างน้อย 1 รูปในพอร์ตฟอลิโอ{" "}
              </div>
            )}
            <div tw="w-full flex justify-around mt-2 mb-[5vh]">
              <input
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleSelectImage}
                multiple
              />
              <button
                tw="w-[40%] text-white rounded-[20px] bg-[#D62B70] h-[30px]"
                onClick={handleAddFileClick}
              >
                เพิ่มรูปภาพ
              </button>
              <button
                onClick={handleClickDelete}
                tw="w-[40%] text-white rounded-[20px] bg-[#EB4335] h-[30px]"
              >
                ลบรูปนี้
              </button>
            </div>
          </div>
          <div tw="w-[90%] flex gap-x-2 mb-5">
            <input
              type="checkbox"
              id="ch"
              checked={isPublic === false}
              onChange={handleClickIsPublic}
            />
            <label htmlFor="ch">ปิดการมองเห็นพอร์ตฟอลิโอ</label>
          </div>
          <ButtonContainer>
            <Button
              secondary
              onClick={() => {
                navigate(-1, { replace: true });
              }}
              width="40%"
            >
              ย้อนกลับ
            </Button>
            <Button primary onClick={handleClickSubmit} width="40%">
              ยืนยัน
            </Button>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};

export default EditPortfolioform;
