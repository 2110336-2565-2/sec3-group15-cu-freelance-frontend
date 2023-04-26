import tw, { styled } from 'twin.macro';
import React, { useContext } from 'react';
import { useWindow } from '../hooks/window-hook';
import { useEffect } from 'react';
import ChatList from '../components/chat/ChatList';
import Chat from '../components/chat/Chat';
import { AuthContext } from '../context/AuthProvider';
const Container = styled.div(() => [
  tw`mt-[10vh] flex flex-row justify-center gap-x-5 mb-4 max-h-[82vh]`
]);


const ChatEntrancePage = () => {
  const windowSize = useWindow();
  const authCtx = useContext(AuthContext);
  const ws = new WebSocket("wss://pbeta.cu-freelance.tech/v1/chat/ws");
  ws.onopen = async () => {
    const loginMessage = {
      type: 1,
      token: authCtx.acToken,
    }
    ws.send(JSON.stringify(loginMessage));
  }
  ws.onmessage = async (event) => {
    console.log(event.data);
    if (event.data.connect_success === true) setUserInfo(...ws);
  }
  ws.onerror = (ev) => {
    console.error("Got error", ev);
  };
  ws.onclose = (ev) => {
    console.debug(`WebSocket disconnected at code ${ev.code}`);
  };
  return (
    <>
      <Container>
        <ChatList />
        {windowSize >= 850 && <Chat />}
      </Container>
    </>
  );
};

export default ChatEntrancePage;