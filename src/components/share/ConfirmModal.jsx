import React from "react";
import ReactDOM from "react-dom";
import tw, {styled} from "twin.macro";
import Backdrop from "./Backdrop";
import Button from "./Button";
const ModalOverlay = (props) => {
  const Container = styled.div(({})=>[
    tw`flex flex-col fixed m-auto top-0 left-0 bottom-0 right-0 items-center p-2 dt:max-w-1/4 justify-between`
  ]);
  const Icon = styled.img(({})=>[
    tw``
  ]);
  const Title = styled.div(({})=>[
    tw`font-bold text-mobile-h1 m-2`
  ]);
  const Content = styled.div(({})=>[
    tw`font-regular text-mobile-body px-4`
  ]);
  const ButtonSection = styled.div(({})=>[
    tw`flex flex-row justify-between`
  ]);
  const content = (
    <Container>
        <Icon src={props.icon}/>
        <Title>{props.title}</Title>
        <Content>{props.content}</Content>
        <ButtonSection>
            <Button secondary>{props.lftText}</Button>
            primary ? <Button >{props.rgtText}</Button> : <Button>{props.rgtText}</Button>
        </ButtonSection>
    </Container>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default Modal;
