import { createContext, useContext } from "react";

export const AuthContext = createContext({
  uid: null,
  acToken: null,
  reToken:null,
  login: async() => {},
  logout: () => {},
  setUserInfo:()=>{},
});

