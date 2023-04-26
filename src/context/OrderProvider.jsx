import { createContext,useState } from "react";

export const OrderContext = createContext({
  backTo: "/search",
  freelanceID: null,
  flDisplayName: null,
  setFLDisplayName: (name) => {},
  backToText: "เลือกฟรีเเลนซ์",
  clickCreateTemplate: (type) => {},
  setFreelanceID: (id) => {},
});

const OrderProvider = ({ children }) => {
  const [backTo, setBackTo] = useState("/search");
  const [freelanceID, setFreelanceID] = useState(null);
  const [flDisplayName, setFLDisplayName] = useState(null);
  const [backToText, setBackToText] = useState("เลือกฟรีเเลนซ์");

  const clickCreateTemplate = (type) => {
    if (type === "send-order") {
      setBackTo(`/create-order-request/${freelanceID}`);
      setBackToText("กลับไปหน้าส่งออเดอร์");
    } else {
      setFreelanceID(null);
      setFLDisplayName(null);
      setBackTo("search");
      setBackToText("เลือกฟรีเเลนซ์");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        backTo,
        freelanceID,
        backToText,
        clickCreateTemplate,
        setFreelanceID,
        flDisplayName,
        setFLDisplayName
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
