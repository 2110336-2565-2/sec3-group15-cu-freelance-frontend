import { useState, useCallback, useEffect } from "react";
import { apiClient } from "../utils/axios";
let logoutTimer;

export const useAuth = () => {
  const [acToken, setAcToken] = useState(false);
  const [reToken, setReToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback(async (acToken, reToken, expiresOn) => {
    setAcToken(acToken);
    setReToken(reToken);
    const tokenExpirationDate = expiresOn;
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
      await apiClient.patch(
        "/user/",
        JSON.stringify({ display_name: "test" }),
        { headers: { "Content-Type": "application/json" } }
      );
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(() => {
    setAcToken(null);
    setReToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
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
      if (new Date(storedData.expiration) > new Date()) {
        login(
          storedData.userId,
          storedData.token,
          new Date(storedData.expiration)
        );
      } else {
        //ยิงไปขอ acToken ใหม่ ถ้า reToken ไม่หมดอายุ
      }
    }
  }, [login]);

  return { acToken, reToken, login, logout, userId };
};
