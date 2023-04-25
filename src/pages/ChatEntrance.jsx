import tw, { styled } from 'twin.macro';
import React from 'react';
import { useWindow } from '../hooks/window-hook';
import { useEffect } from 'react';
import ChatList from '../components/chat/ChatList';
import Chat from '../components/chat/Chat';
const Container = styled.div(() => [
  tw`mt-[10vh] flex flex-row justify-center gap-x-5 mb-4 max-h-[82vh]`
]);


const ChatEntrancePage = () => {
  const windowSize = useWindow();
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