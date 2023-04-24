import tw, { styled } from "twin.macro";
import RequestDescription from "../components/order/RequestDescription";
import Button from "../components/share/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div(({ from, isModal }) => [
  tw`flex flex-col gap-y-2 m-auto justify-between w-full  dt:relative items-center `,
  isModal === true && tw`dt:w-1/6`,
  isModal === false && tw`w-full`,
  from && tw`min-h-[95vh] pb-[5vh]`,
]);
const Footer = styled.div(({ row = false, isModal }) => [
  tw`flex flex-col items-center  bottom-8 gap-y-8`,
  row && tw`flex-row gap-x-4`,
  isModal === true && tw``,
  isModal === false && tw`dt:absolute`,
]);
const Back2Home = styled.button(({}) => [
  tw`font-ibm text-freelance-black-primary text-mobile-h2`,
]);

const RequestComplete = ({
  icon,
  iconDesc,
  title,
  desc,
  lftOnclick,
  rgtOnclick,
  red,
  hasIconDesc,
  isModal = false,
  disable = false,
}) => {
  //pass dict of title: string, desc: string, bt1desc:string, bt2: boolean (optional), bt2desc: string through navigate
  const location = useLocation();
  const navigate = useNavigate();
  const btOnclickHandler = (path) => {
    navigate(path);
  };
  return location.state ? (
    <Container from={location.state} isModal={isModal}>
      <RequestDescription
        title={location.state.title}
        desc={location.state.desc}
      />
      {location.state && (
        <Footer>
          <Button
            primary
            onClick={btOnclickHandler.bind(null, location.state.path1)}
          >
            {location.state.bt1Text}
          </Button>
          {location.state.bt2 && (
            <Back2Home
              onClick={btOnclickHandler.bind(null, location.state.path2)}
            >
              <u>{location.state.bt2Text}</u>
            </Back2Home>
          )}
        </Footer>
      )}
    </Container>
  ) : (
    <Container from={location.state}>
      <RequestDescription
        icon={icon}
        iconDesc={iconDesc}
        title={title}
        desc={desc}
        hasIconDesc={hasIconDesc}
      />
      <Footer row>
        <Button secondary onClick={lftOnclick} disable={disable}>
          ยกเลิก
        </Button>
        {red ? (
          <Button red onClick={rgtOnclick} disable={disable}>
            ยืนยัน
          </Button>
        ) : (
          <Button primary onClick={rgtOnclick} disable={disable}>
            ยืนยัน
          </Button>
        )}
      </Footer>
    </Container>
  );
};
export default RequestComplete;
