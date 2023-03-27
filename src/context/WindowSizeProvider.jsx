import { createContext, useContext } from "react";

export const WindowSizeContext = createContext({
  width:window.innerWidth
});