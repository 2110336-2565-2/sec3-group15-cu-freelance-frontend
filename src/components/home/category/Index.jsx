import tw from "twin.macro";
import { dummy_category } from "../../../store/home";
import CategoryCard from "../../share/CategoryCard";
import Button from "../../share/Button";

const CategoryIndex = () => {
  const PageWrapper = tw.div`h-[100vh] w-[90%] max-w-[1200px] mx-auto bg-white pt-[15vh]`;
  const HeaderWrapper = tw.div`pl-[2%] font-ibm font-bold text-[#D62B70] text-3xl flex justify-between`;
  const CardWrapper = tw.div`h-[55%] w-[100%] mt-[10%] max-w-[1100px] mx-auto flex justify-between`;

  return (
    <PageWrapper>
      {" "}
      <HeaderWrapper>
        {" "}
        เลือกฟรีเเลนซ์จากหมวดหมู่เหล่านี้ <Button>ดูฟรีแลนซ์ทั้งหมด</Button>
      </HeaderWrapper>
      <CardWrapper>
        {dummy_category.map((category,idx) => (
          <CategoryCard key={idx} imgSrc={category.img} title={category.text} />
        ))}
      </CardWrapper>
    </PageWrapper>
  );
};

export default CategoryIndex;
