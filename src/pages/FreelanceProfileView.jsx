import tw, { styled } from "twin.macro";
import CircleImage from "../components/share/CircleImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { apiClient } from "../utils/axios";
import Button from "../components/share/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
const Container = styled.div(() => [
  tw`flex flex-col dt:flex-row px-8 dt:px-32 gap-y-2 gap-x-16 dt:items-center max-w-[400px] dt:max-w-fit`,
]);
const ImageContainer = styled.div(() => [
  tw`flex flex-row h-[100px] w-[100px] dt:h-[200px] dt:w-[200px]`,
]);
const InformationContainer = styled.div(() => [
  tw`flex flex-col min-w-[250px] dt:min-w-[300px] gap-y-2 dt:gap-y-4`,
]);
const DisplayName = styled.div(() => [
  tw`font-ibm font-bold text-mobile-h1 dt:text-desktop-h1`,
]);
const Faculty = styled.div(() => [
  tw`font-ibm text-mobile-h2 dt:text-desktop-h2`,
]);
const ButtonContainer = styled.div(() => [tw`flex flex-row gap-x-4`]);
const FreelanceProfileViewPage = ({ freelance_id }) => {
  const [freelanceImg, setFreelanceImg] = useState();
  const [freelanceName, setFreelanceName] = useState();
  const [freelanceFaculty, setFreelanceFaculty] = useState();
  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchData = async () => {
    let response = await apiClient.get(`file/avatar?id=${freelance_id}`);
    setFreelanceImg(response.data.avatars[0].url);
    response = await apiClient.get(`user/freelance/${freelance_id}`);
    console.log(response);
    setFreelanceName(response.data.display_name);
    setFreelanceFaculty(response.data.faculty);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const addPortHandler = () => {
    navigate(`/profile/${AuthCtx.userInfo.id}/add-portfolio`);
  };
  const chatHandler = () => {
    navigate("/home");
  };

  const sendOrderHandler = () => {
    navigate("/create-order-request", {
      state: {
        displaName: freelanceName,
        id: freelance_id,
      },
    });
  };
  return (
    <>
      <Container>
        <ImageContainer>
          <CircleImage image={freelanceImg} isAnimate />
        </ImageContainer>
        <InformationContainer>
          <DisplayName>{freelanceName}</DisplayName>
          <Faculty>
            นิสิต <b>{mapFaculties[freelanceFaculty]}</b> จุฬาฯ
          </Faculty>
          <ButtonContainer>
            {AuthCtx.userInfo.id == freelance_id ? (
              <Button onClick={addPortHandler} primary width="60%" px="0rem">
                <b>เพิ่มพอร์ต</b>
              </Button>
            ) : (
              <>
                <Button onClick={sendOrderHandler} primary width="55%">
                  <b>ส่งออเดอร์</b>
                </Button>
                <Button onClick={chatHandler} secondary width="35%">
                  <b>แชท</b>
                </Button>
              </>
            )}
          </ButtonContainer>
        </InformationContainer>
      </Container>
    </>
  );
};

const mapFaculties = {
  "Graduate School": "บัณฑิตวิทยาลัย",
  "Faculty of Engineering": "คณะวิศวกรรมศาสตร์",
  "Faculty of Arts": "คณะอักษรศาสตร์",
  "Faculty of Science": "คณะวิทยาศาสตร์",
  "Faculty of Political Science": "คณะรัฐศาสตร์",
  "Faculty of Architecture": "คณะสถาปัตยกรรมศาสตร์",
  "Faculty of Commerce And Accountancy": "คณะพาณิชยศาสตร์และการบัญชี",
  "Faculty of Education": "คณะครุศาสตร์",
  "Faculty of Communication Arts": "คณะนิเทศศาสตร์",
  "Faculty of Economics": "คณะเศรษฐศาสตร์",
  "Faculty of Medicine": "คณะแพทยศาสตร์",
  "Faculty of Veterinary Science": "คณะสัตวแพทยศาสตร์",
  "Faculty of Dentistry": "คณะทันตแพทยศาสตร์",
  "Faculty of Pharmaceutical Sciences": "คณะเภสัชศาสตร์",
  "Faculty of Law": "คณะนิติศาสตร์",
  "Faculty of Fine And Applied Arts": "คณะศิลปกรรมศาสตร์",
  "Faculty of Nursing": "คณะพยาบาลศาสตร์",
  "Faculty of Allied Health Sciences": "คณะสหเวชศาสตร์",
  "Faculty of Psychology": "คณะจิตวิทยา",
  "Faculty of Sports Science": "คณะวิทยาศาสตร์การกีฬา",
  "School of Agricultural Resources": "วิทยาลัยประชากรศาสตร์",
  "College of Population Studies": "วิทยาลัยประชากรศาสตร์",
  "College of Public Health Sciences": "วิทยาลัยวิทยาศาสตร์สาธารณสุข",
  "Language Institute": "สถาบันภาษา",
  "School of Integrated Innovation": "สถาบันนวัตกรรมบูรณาการ",
  "Sasin Graduate Institute of Business Administion":
    "สถาบันบัณฑิตบริหารธุรกิจ ศศินทร์ฯ",
  "Other University": "มหาวิทยาลัยอื่น",
  "The Sirindhorn Thai Language Institute": "สถาบันภาษาไทยสิรินธร",
  "Office of Academic Affairs": "ศูนย์การศึกษาทั่วไป",
};

export default FreelanceProfileViewPage;
