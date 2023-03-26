import tw from "twin.macro";
import { categories } from "../../../store/landing2-store";
import CategoryButton from "./CategoryButton";

const Container = tw.div`flex justify-around mx-auto dt:max-w-[1200px] dt:w-[90%]`;

const CategoryButtonContainer = ({ select, setSelect }) => {
  console.log(select);

  return (
    <Container>
      {categories.map((category, idx) => (
        <CategoryButton
          key={idx}
          text={category.text}
          isSelect={select === category.value}
          imgPink={category.imgPink}
          imgWhite={category.imgWhite}
          value={category.value}
          setSelect={setSelect}
        />
      ))}
    </Container>
  );
};

export default CategoryButtonContainer;
