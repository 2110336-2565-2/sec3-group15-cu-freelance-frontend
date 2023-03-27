import { createContext, useContext } from "react";
import { useState } from "react";
function getWindowSize() {
const { innerWidth } = window;
return innerWidth;
}
const [windowSize, setWindowSize] = useState(getWindowSize());
console.log(windowSize);

useEffect(() => {
function handleWindowResize() {
    setWindowSize(getWindowSize());
}

window.addEventListener("resize", handleWindowResize);

return () => {
    window.removeEventListener("resize", handleWindowResize);
};
}, []);
export const WindowSizeContext = createContext({
  width:windowSize
});