import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { authClient } from "../utils/auth";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get("ticket");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async (ticket) => {
      const data = JSON.stringify({ ticket: ticket, university: 1 });
      try {
        let response = await authClient.post("/auth/verify", data, {
          headers: { "Content-Type": "application/json" },
        });
        const { access_token, refresh_token, expires_in } = response.data;
        console.log(response.data);
        let expiresOn = new Date();
        expiresOn.setSeconds(expiresOn.getSeconds() + expires_in);
        response = await authCtx.login(access_token, refresh_token, expiresOn);
        console.log(response);
        navigate("/home", { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    if (ticket) {
      fetch(ticket);
    }
  }, []);
  return <div>loading...</div>;
};
export default Auth;
