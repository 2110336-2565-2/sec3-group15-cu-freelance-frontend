import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
const Auth = () => {
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get("ticket");
  const fetch = async (ticket) => {
    const data = JSON.stringify({ ticket: ticket, university: 1 });
    try {
      const response = await axios.post("/auth/verify", data, {
        headers: { "Content-Type": "application/json" },
      });
      const data=response.data;
      
    } catch (err) {
      console.log(err);
    }
  };
  if (ticket) {
    fetch(ticket);
  }
};
export default Auth;
