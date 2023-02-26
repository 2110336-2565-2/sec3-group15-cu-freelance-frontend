import tw, { styled } from "twin.macro";
import React from "react";

const PaginationBar = React.forwardRef((props, ref) => {
  const TextButton = styled.div(({ hide }) => [
    hide && tw`invisible`,
    tw`cursor-pointer`,
  ]);

 

  return (
    <div tw="w-full flex justify-center">
      <div tw="w-1/3 flex justify-between">
        <TextButton onClick={props.onPrev} hide={parseInt(props.page) === 1}>
          {"< Prev"}
        </TextButton>
        <form onSubmit={props.onSet} tw="w-[100px]">
          <input
            type="number"
            placeholder={props.page}
            ref={ref}
            tw="placeholder:text-gray-500 w-[50px] bg-gray-100 border-2 border-black text-center"
          />
          /{props.totalPage}
        </form>

        <TextButton
          onClick={props.onNext}
          hide={parseInt(props.page) === props.totalPage}
        >
          {"Next >"}
        </TextButton>
      </div>
    </div>
  );
});
export default PaginationBar;
