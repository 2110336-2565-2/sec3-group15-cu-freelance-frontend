import tw from "twin.macro";
import { dummy_comment } from "../../../store/home";
import CommentCard from "../../share/CommentCard";
import Button from "../../share/Button";
const CommentIndex = () => {
  const PageWrapper = tw.div`h-[100vh] w-[90%] max-w-[1200px] mx-auto bg-white pt-[15vh] snap-center`;
  const HeaderWrapper = tw.div`font-ibm font-bold  text-[#D62B70] text-3xl text-center`;
  const CardWrapper = tw.div`h-[55%] w-[100%] mt-[10%] mx-auto flex justify-between`;

  return (
    <PageWrapper>
      {" "}
      <HeaderWrapper>ความเห็นจากผู้ใช้งานจริง</HeaderWrapper>
      <CardWrapper>
        {dummy_comment.map((comment,idx) => (
          <CommentCard
          key={idx}
            imgSrc={comment.img}
            comment={comment.comment}
            name={comment.name}
            position={comment.position}
          />
        ))}
      </CardWrapper>
    </PageWrapper>
  );
};

export default CommentIndex;
