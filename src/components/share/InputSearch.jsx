import "twin.macro";
import searchIcon from "../../assets/searchIcon.svg";
import filterIcon from "../../assets/FilterIcon.svg";

const InputSearch = (props) => {
   
  return (
    <form
      onSubmit={props.onSubmit}
      tw="relative border rounded-lg  w-full h-full px-[2px]"
    >
      <input
        onChange={props.onChange}
        value={props.value}
        type="text"
        placeholder={props.placeholder}
        tw="border-none font-ibm text-[#D62B70] text-mobile-body focus:outline-none placeholder:font-ibm  p-2  bg-transparent ml-[12%] w-[85%] h-[100%] dt:text-mobile-h2"
      />
      <img
        src={searchIcon}
        alt="searchIcon"
        tw="object-fill absolute left-0.5 top-1/2 translate-y-[-50%]"
      />
      {props.filter&&<img tw="absolute right-2 top-1/2 translate-y-[-50%]" src={filterIcon} onClick={props.onClickFilter}/>}
    </form>
  );
};

export default InputSearch;
