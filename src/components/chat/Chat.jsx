import tw, { styled } from 'twin.macro';
import React, { useEffect, useRef } from 'react';
import CircleImage from '../share/CircleImage';
import { useState } from 'react';
import { useForm } from '../../hooks/form-hook';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
// import { ChatContext } from '../../context/ChatProvider';
import { apiClient } from '../../utils/axios';
// const startMessageList = [{ sender: 0, message: "สวัสดีจ้ะ" }, { sender: 0, message: "ว่างไหม" }, { sender: 1, message: "สวัสดีครับ" }, { sender: 0, message: "พี่มีโปรเจกต์ทำเว็บสำหรับนิสิตจุฬา รายละเอียดคร่าวๆคือทำเว็บไซต์ freelance ให้เด็กจุฬา ให้ค่าเหนื่อยประมาณ 100000 น้องสนใจมั้ย" }, { sender: 1, message: "น่าสนใจครับ ลองส่งorderมาให้ผมลองอ่านคร่าวๆดูก่อนได้ไหม เดี๋ยวผมจะยืนยันอีกที" }]

const Container = styled.div(() => [
    tw`flex flex-col w-full dt:w-2/3`
]);

const Information = styled.div(() => [
    tw`flex flex-row gap-x-2 items-center h-[60px]`
]);

const Hr = styled.hr(() => [
    tw`h-2 w-full`
]);

const CircleImageContainer = styled.div(() => [
    tw`w-12 h-12`
]);

const Name = styled.div(() => [
    tw`font-ibm text-mobile-h1`
]);

const Input = styled.input(() => [
    tw`font-ibm my-3 pl-4 py-2 bg-gray-100`
])

const MessageContainer = styled.div(() => [
    tw`flex flex-col w-full bg-gray-100 h-[65vh] p-8 overflow-y-scroll`
])

const Message = styled.div(({ right }) => [
    tw`flex flex-col relative w-fit w-full`,
    right && tw`items-end`
])
const ProfileContainer = styled.div(() => [
    tw`absolute w-8 h-8 bottom-[-15px] left-[-25px]`
])
const Text = styled.div(() => [
    tw`rounded-[20px] font-ibm bg-white text-black p-4 my-1 w-fit max-w-[45%]`
])
const Chat = () => {
    const authCtx = useContext(AuthContext);
    // const chatCtx = useContext(ChatContext);
    // useEffect(() => {
    //     console.log(chatCtx.message);
    // }, [chatCtx.message])
    const modifiedList = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].user == 0 && (i + 1 == list.length || list[i + 1].user == 1)) {
                list[i].show = true;
            }
            else {
                list[i].show = false;
            }
        }
        return list;
    }
    const messageRef = useRef()
    let [messageList, setMessageList] = useState([]);
    const changeList = (newMessage) => {
        const newList = [...messageList];
        if (chatCtx.partner && newMessage.sender === chatCtx.partner.id && newList.length > 0) {
            newList[newList.length - 1].show = false;
            newMessage.show = true;
        }
        newList.push(newMessage);
        setMessageList(newList);
    }
    const keyDownHandler = (e) => {
        // e.preventDefault();
        if (e.key == "Enter" && e.target.value) {
            changeList({ sender: authCtx.userInfo.id, message: e.target.value });
            const data = { type: 2, targets: [chatCtx.partner.id], message: e.target.value };
            console.log(data, chatCtx.ws);
            chatCtx.setAllMessageList((prev) => [...prev, { sender: authCtx.userInfo.id, message: e.target.value }]);
            chatCtx.ws.send(JSON.stringify(data));
            e.target.value = "";
        }
    }
    useEffect(() => {
        chatCtx.allMessageList.forEach(message => {
            // console.log(message, authCtx.userInfo.id);
            if ((chatCtx.partner && message.sender === chatCtx.partner.id) || message.sender === authCtx.userInfo.id) {
                console.log(message, authCtx.userInfo.id);
                changeList(message);
            }
        })
    }, [])
    useEffect(() => {
        if (chatCtx.socketMessage && chatCtx.partner && chatCtx.socketMessage.sender === chatCtx.partner.id) {
            changeList(chatCtx.socketMessage);
        }
        chatCtx.setSocketMessage(null);
    }, [chatCtx.socketMessage])

    // const fetchRecent = async () => {
    //     try {
    //         const res = apiClient.get("/chat/recent?page=1&limit=10");
    //         console.log(res);
    //     }
    //     catch (err) {

    //     }
    // }
    // useEffect(() => {
    //     fetchRecent();
    // }, [])

    useEffect(() => {
        const scrollHeight = messageRef.current.scrollHeight;
        const height = messageRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messageRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }, [messageList])
    console.log(chatCtx.partner);
    return (
        <>
            <Container>
                <Information>
                    <CircleImageContainer>
                        <CircleImage />
                    </CircleImageContainer>
                    <Name>{chatCtx.partner ? chatCtx.partner.display_name : null}</Name>
                </Information>
                <Hr />
                <MessageContainer ref={messageRef}>
                    {messageList.map((message, i) => {
                        return (
                            <Message key={i} right={message.sender === authCtx.userInfo.id}>
                                {message.show && <ProfileContainer>
                                    <CircleImage image={chatCtx.partner ? chatCtx.partner.avatar : null} />
                                </ProfileContainer>}
                                <Text>
                                    {message.message}
                                </Text>
                            </Message>
                        )
                    })}
                </MessageContainer>
                <Input placeholder="พิมพ์ข้อความของคุณที่นี่" onKeyDown={keyDownHandler} />
            </Container>
        </>
    );
};

export default Chat;