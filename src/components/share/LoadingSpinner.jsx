import "./LoadingSpinner.css";
import tw from "twin.macro";
const LoadingSpinner = () => {
  return (
    <div tw="w-full h-full flex items-center justify-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
