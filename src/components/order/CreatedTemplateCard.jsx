import tw, { styled } from "twin.macro";
import CreateTemplateIcon from "../../assets/Order/CreateTemplateIcon.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { OrderContext } from "../../context/OrderProvider";

const Card = styled.div(({ focus }) => [
  tw`flex flex-col  h-[202px] font-ibm rounded-[20px] min-w-[245px] w-[30%]  shadow relative cursor-pointer p-5 gap-y-3 items-center justify-center`,
  focus && tw`outline outline-2 outline-freelance-pink`,
]);
const PlusImage = tw.img``;
const Description = tw.div`text-base text-freelance-black-primary`;

const CreatedTemplateCard = () => {
    
    const navigate=useNavigate()
    const orderCtx=useContext(OrderContext)

    const clickCardHandler=()=>{
        orderCtx.clickCreateTemplate("send-order")
        navigate('/create-order-template')
    }
  
    return (
    <Card onClick={clickCardHandler}>
      <PlusImage src={CreateTemplateIcon} alt="plus" />
      <Description>เพิ่มออเดอร์ใหม่</Description>
    </Card>
  );
};

export default CreatedTemplateCard;
