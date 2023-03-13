import OrderModal from "./OrderModal";

const OrderModalTemplate = (props) => {
  console.log("hello2");
  return <OrderModal content="gg" header={"test"} onClose={props.onClose} show={props.show}/>;
};

export default OrderModalTemplate;
