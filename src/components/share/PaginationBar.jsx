import tw from "twin.macro";
import React from "react";

const PaginationBar = React.forwardRef((props,ref) => {
  const TextButton = tw.div`cursor-pointer`;

  return (
    <div tw="w-full flex justify-center">
      <div tw="w-1/5 flex justify-between">
        {props.page === 1 && (
          <TextButton onClick={props.onPrev}>{"      "}</TextButton>
        )}
        {props.page !== 1 && (
          <TextButton onClick={props.onPrev}>{"< Prev"}</TextButton>
        )}
        <form onSubmit={props.onSet} tw="w-[100px]">
          <input
            type="number"
            placeholder={props.page}
            ref={ref}
            tw="placeholder:text-gray-500 w-[50px] bg-gray-100 border-2 border-black text-center"
          />
          /{props.totalPage}
        </form>
        {props.page === props.totalPage && (
          <TextButton onClick={props.onNext}>{"      "}</TextButton>
        )}
        {props.page !== props.totalPage && (
          <TextButton onClick={props.onNext}>{"Next >"}</TextButton>
        )}
      </div>
    </div>
  );
});
export default PaginationBar;
