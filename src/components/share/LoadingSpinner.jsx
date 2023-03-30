import "./LoadingSpinner.css";
import tw from "twin.macro";
const LoadingSpinner = ({ white = false }) => {
  return (
    <div tw="w-full h-full flex items-center justify-center min-h-[20px] max-h-[20px]">
      <div
        className={`${white === true ? "lds-ellipsis-white" : ""} lds-ellipsis`}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
