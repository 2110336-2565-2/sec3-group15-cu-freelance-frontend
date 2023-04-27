import tw, { styled } from 'twin.macro';
import React, { useEffect } from 'react';
import ChatCard from './ChatCard';
import { useState } from 'react';
import { useWindow } from '../../hooks/window-hook';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { AuthContext } from '../../context/AuthProvider';
import { apiClient } from '../../utils/axios';
// const chatList = [{ name: "ธีรุตม์ สีเขียว", lastMsg: "สวัสดีครับ" }, { name: "รัชนาท ลาชโรจน์", lastMsg: "คาดว่างานจะเสร็จทันครับบลาบลาบลา" }, { name: "นัน วาณิชยชลกิล", lastMsg: "ตรวจงานก่อนยืนยันนะครับ" }]
const Container = styled.div(() => [
  tw`flex flex-col w-full dt:w-1/3`
]);
const Title = styled.div(() => [
  tw`flex font-ibm text-mobile-h1 dt:text-desktop-h1 text-center h-[60px] items-center justify-center`
])
const Hr = styled.hr(() => [
  tw`h-2 w-full`
])
const ListContainer = styled.div(() => [
  tw`flex flex-col overflow-y-scroll h-[77vh] dt:max-h-fit px-2`
])
const ChatList = () => {
  const authCtx = useContext(AuthContext);
  const [chatList, setChatList] = useState([]);
  const chatCtx = useContext(ChatContext);
  const startList = [];
  useEffect(() => {
    console.log("eiei", chatCtx.partner);
    if (chatCtx.partner) setChatList([chatCtx.partner]);
    chatCtx.allMessageList.forEach(async (message) => {
      if (authCtx.userInfo.user_type === 1 && message.sender != authCtx.userInfo.id) { //user is freelance
        console.log(message);
        const res = await apiClient.get(`/user/customer/${message.sender}`);
        const res2 = await apiClient.get(`/file/avatar?id=${message.sender}`);
        console.log(res2);
        if (!startList.includes(res.data)) startList.push(res.data);
      }
      else if (authCtx.userInfo.user_type === 2 && message.sender != authCtx.userInfo.id) { //user is customer
        const res = await apiClient.get(`/user/freelance/${message.sender}`);
        const res2 = await apiClient.get(`/file/avatar?id=${message.sender}`);
        console.log(res2);
        if (!startList.includes(res.data)) {
          startList.push(res.data);
        }
      }
      setChatList(startList);
    });
  }, [])
  console.log(chatCtx.allMessageList);
  const onClickHandler = (partner) => {
    chatCtx.setPartner(partner);
  }
  console.log(chatList);
  const windowSize = useWindow();

  return (
    <>
      <Container>
        <Title>แชท</Title>
        <Hr />
        <ListContainer>
          {chatList && chatList.map((chat, i) => {
            return (
              <ChatCard name={chat.display_name} onClick={onClickHandler.bind(null, chat)} key={i} selected={windowSize >= 850 && chatCtx.partner === chat} />
            )
          })}
        </ListContainer>

      </Container>
    </>
  );
};

export default ChatList;