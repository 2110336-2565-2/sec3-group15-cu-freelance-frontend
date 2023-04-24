import tw, { styled } from 'twin.macro';
import React from 'react';
import ChatCard from './ChatCard';
import { useState } from 'react';
import { useWindow } from '../../hooks/window-hook';
const chatList = [{name:"ธีรุตม์ สีเขียว", lastMsg:"สวัสดีครับ"}, {name:"รัชนาท ลาชโรจน์", lastMsg:"คาดว่างานจะเสร็จทันครับบลาบลาบลา"}, {name:"นัน วาณิชยชลกิล", lastMsg:"ตรวจงานก่อนยืนยันนะครับ"}]
const Container = styled.div(() => [
  tw`flex flex-col w-full dt:w-1/3`
]);
const Title = styled.div(()=>[
  tw`flex font-ibm text-mobile-h1 dt:text-desktop-h1 text-center h-[60px] items-center justify-center`
])
const Hr = styled.hr(()=>[
  tw`h-2 w-full`
])
const ListContainer = styled.div(()=>[
  tw`flex flex-col overflow-y-scroll min-h-[77vh] dt:max-h-fit px-2`
])
const ChatList = () => {
  
  const [selectedChat, setSelectedChat] = useState(null);

  const onClickHandler = (i)=>{
    setSelectedChat(i);
  }

  const windowSize = useWindow();

  return (
    <>
      <Container>
        <Title>แชท</Title>
        <Hr/>
        <ListContainer>
          {chatList.map((chat, i)=>{
            return (
              <ChatCard name={chat.name} lastMsg={chat.lastMsg} onClick={onClickHandler.bind(null, i)} key={i} selected={windowSize>=850 && selectedChat==i}/>
            )
          })}
        </ListContainer>
        
      </Container>
    </>
  );
};

export default ChatList;