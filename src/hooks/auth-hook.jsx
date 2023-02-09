import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [acToken, setAcToken] = useState(false);
  const [reToken, setReToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, acToken, reToken, expirationDate) => {
    setAcToken(acToken);
    setReToken(reToken);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        uid,
        acToken,
        reToken,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
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
      }
      else{
        //ยิงไปขอ acToken ใหม่ ถ้า reToken ไม่หมดอายุ
      }
    }
  }, [login]);

  return { acToken, reToken, login, logout, userId };
};
