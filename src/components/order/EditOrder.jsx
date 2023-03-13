import CreateOrder1 from "./CreateOrder1";
import CreateOrder2 from "./CreateOrder2";
import CreateOrder3 from "./CreateOrder3";
import React from "react";
const EditOrder = ({inputHandler1, inputHandler2, inputHandler3, show=true})=>{
    return (
        <>
            <CreateOrder1 inputHandler1={inputHandler1} show={show}/>
            <CreateOrder2 inputHandler2={inputHandler2} show={show}/>
            <CreateOrder3 inputHandler3={inputHandler3} show={show}/>
        </>
    )
}
export default EditOrder;