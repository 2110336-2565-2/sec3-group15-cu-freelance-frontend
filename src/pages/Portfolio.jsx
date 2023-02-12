import tw from "twin.macro";
import PortfolioExample from "../assets/PortfolioExample.svg";
import ProfileCard from "../components/share/ProfileCard2";
import UserImage from "../assets/profile1.svg";
const PortfolioPage = () => {
  const Container = tw.div`flex flex-col text-left my-[15vh] mx-auto px-20 text-[#D62B70] font-ibm gap-y-12 max-w-[1200px]`;
  const Path = tw.div`font-ibm font-bold text-sm`;
  const Image = tw.img`self-center rounded-[30px] border-[#D62B70] border-8`;
  const Title = tw.h1`font-bold text-3xl`;
  const Description = tw.p`font-bold text-lg`;
  return (
    <Container>
      <Path>
        ประเภทงาน {">"} Graphic & Design {">"} Logo
      </Path>
      <Image src={PortfolioExample}></Image>
      <Title>ออกแบบโลโก้ในสไตล์ที่คุณต้องการ</Title>
      <Description>
        ออกแบบโลโก้ราคาเริ่มต้น 3,000 บาท ออกแบบให้เลือก 3 แบบ แก้ไขได้จำนวน 3
        ครั้ง ได้รับไฟล์ ai, jpg, png ค่ะ
        ***สอบถามข้อมูลเพิ่มเติมได้ทางแชทเลยนะคะ ขอบคุณค่ะ :) ขั้นตอนการทำงาน
        สำหรับ ออกแบบโลโก้ในสไตล์ที่คุณต้องการ 1. ออกแบบโลโก้ให้เลือก 3
        แบบในครั้งแรก 2. ลูกค้าเลือกมา 1 แบบ และคอมเม้นในส่วนที่ต้องการปรับแก้ไข
        3. แก้ไขงานได้ 3 ครั้ง จนได้โลโก้เสร็จสมบูรณ์ 1 ชิ้น 4. ส่งมอบไฟล์ Ai,
        Jpg, Png
      </Description>
      <ProfileCard
        userImage={UserImage}
        username="Username123"
        portCount={11}
        avgTime={5}
      />
    </Container>
  );
};
export default PortfolioPage;
