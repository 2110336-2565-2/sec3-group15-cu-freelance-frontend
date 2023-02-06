import tw from "twin.macro";
import Button from "../../share/Button";
const CategoryIndex = () => {

  const CardWrapper=tw.div`h-[80%] w-[100%] flex`;

  return (
    <div tw="h-[100vh] w-[90%] max-w-[1200px] mx-auto bg-white pt-[15vh]">
      <div tw="pl-[2%] font-ibm font-bold text-[#D62B70] text-3xl flex justify-between">
        เลือกฟรีเเลนซ์จากหมวดหมู่เหล่านี้ <Button>ดูฟรีแลนซ์ทั้งหมด</Button>
      </div>
      <CardWrapper></CardWrapper>
    </div>
  );
};

export default CategoryIndex;
