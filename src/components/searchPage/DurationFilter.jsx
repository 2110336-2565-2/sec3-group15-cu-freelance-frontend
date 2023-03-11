import React from "react";
import tw from "twin.macro";

const Container=tw.div`w-full flex gap-x-4 mb-2`
const DurationFilter = (props) => {

  return (
    <Container>
      <input
        type="checkbox"
        name={props.value}
        onChange={props.onChange}
        id={props.value}
        checked={props.showDuration[props.value]}
      />
      <label htmlFor={props.value}>{props.text}</label>
    </Container>
  );
};

export default DurationFilter
