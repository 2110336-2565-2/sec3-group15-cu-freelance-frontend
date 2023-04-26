import { useState, useCallback, useEffect } from "react";
import { apiClient } from "../utils/axios";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import WebSocket from "isomorphic-ws";
let logoutTimer;

export const useAuth = () => {
  const [acToken, setAcToken] = useState(false);
  const [reToken, setReToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userInfo, setUserInfo] = useState({});


  const login = useCallback(async (acToken, reToken, expiresOn) => {
    setAcToken(acToken);
    setReToken(reToken);
    const tokenExpirationDate = expiresOn;
    // const [socketUrl, setSocketUrl] = useState("wss://pbeta.cu-freelance.tech/v1/chat/ws");
    // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    // console.log(readyState);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        acToken,
        reToken,
        expiresOn: tokenExpirationDate.toISOString(),
      })
    );
    try {
      let response1 = await apiClient.get("/auth/me");
      let response2 = await apiClient.get(
        `/file/avatar?id=${response1.data.id}`
      );
      const url = { url: response2.data.avatars[0].url };
      console.log(response2);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...response1.data, ...url })
      );
      setUserInfo({ ...response1.data, ...url });
      return { ...response1.data, ...url };
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(() => {
    setAcToken(null);
    setReToken(null);
    setTokenExpirationDate(null);
    setUserInfo(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("userInfo");
  }, []);

  // auto logout ยังไม่น่าใช้
  //   useEffect(() => {
  //     if (token && tokenExpirationDate) {
  //       const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
  //       logoutTimer = setTimeout(logout, remainingTime);
  //     } else {
  //       clearTimeout(logoutTimer);
  //     }
  //   }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.acToken) {
      if (new Date(storedData.expiresOn) > new Date()) {
        login(
          storedData.acToken,
          storedData.reToken,
          new Date(storedData.expiresOn)
        );
      } else {
        //ยิงไปขอ acToken ใหม่ ถ้า reToken ไม่หมดอายุ
      }
    }
  }, [login]);

  return { acToken, reToken, login, logout, userInfo, setUserInfo };
};
