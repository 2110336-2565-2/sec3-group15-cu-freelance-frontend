import tw, { styled } from "twin.macro";

const Container = styled.div(({ color }) => [
  tw`text-[10px] rounded-[10px] h-fit px-2 py-1 text-ellipsis`,
  color === "green" && tw`text-[#365E3D] bg-[#D6F5DB] `,
  color === "red" && tw`text-[#660000] bg-[#F5BCBC] `,
  color === "gray" && tw`text-[#0D1A26] bg-[#EFF0F0]`,
  color === "orange" && tw`text-[#663300] bg-[#F5D9BC]`,
  color === "blue" && tw`text-[#002266] bg-[#B8CEF9]`,
]);

const StatusBar = (props) => {
  return <Container color={props.color}>{props.children}</Container>;
};

export default StatusBar;
