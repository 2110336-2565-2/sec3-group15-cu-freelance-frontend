import tw, { styled } from 'twin.macro';
import React, { useEffect, useRef } from 'react';
import CircleImage from '../share/CircleImage';
import { useState } from 'react';
import Input from '../share/Input';
import { useForm } from '../../hooks/form-hook';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ChatContext } from '../../context/ChatProvider';
const startMessageList = [{ sender: 0, message: "สวัสดีจ้ะ" }, { sender: 0, message: "ว่างไหม" }, { sender: 1, message: "สวัสดีครับ" }, { sender: 0, message: "พี่มีโปรเจกต์ทำเว็บสำหรับนิสิตจุฬา รายละเอียดคร่าวๆคือทำเว็บไซต์ freelance ให้เด็กจุฬา ให้ค่าเหนื่อยประมาณ 100000 น้องสนใจมั้ย" }, { sender: 1, message: "น่าสนใจครับ ลองส่งorderมาให้ผมลองอ่านคร่าวๆดูก่อนได้ไหม เดี๋ยวผมจะยืนยันอีกที" }]

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
    const chatCtx = useContext(ChatContext);
    const [messageInput, inputHandler] = useForm({
        input: {
            value: "",
            isValid: true
        }
    })
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
    let [messageList, setMessageList] = useState(modifiedList(startMessageList));
    const changeList = (newMessage) => {
        const newList = [...messageList];
        if (newMessage.sender === 0) {
            newList[newList.length - 1].show = false;
            newMessage.show = true;
        }
        newList.push(newMessage);
        setMessageList(newList);
    }
    const keyDownHandler = () => {
        if (messageInput.inputs.input.value) {
            changeList({ sender: 1, message: messageInput.inputs.input.value });
            chatCtx.ws.send(JSON.stringify({ type: 4, message: messageInput.inputs.input.value }));
        }
    }
    useEffect(() => {
        if (messageList && messageList[messageList.length - 1].user == 0) {
            return;
        }
        const scrollHeight = messageRef.current.scrollHeight;
        const height = messageRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messageRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }, [messageList])
    return (
        <>
            <Container>
                <Information>
                    <CircleImageContainer>
                        <CircleImage />
                    </CircleImageContainer>
                    <Name>demo</Name>
                </Information>
                <Hr />
                <MessageContainer ref={messageRef}>
                    {messageList.map((message, i) => {
                        return (
                            <Message key={i} right={message.sender == 1} onClick={changeList.bind(null, { sender: 0, mess: "kuy" })}>
                                {message.show && <ProfileContainer>
                                    <CircleImage />
                                </ProfileContainer>}
                                <Text>
                                    {message.message}
                                </Text>
                            </Message>
                        )
                    })}
                </MessageContainer>
                <Input type="text" id="input" validator={[]} placeholder="ส่งข้อความ..." onInput={inputHandler} keyDownHandler={keyDownHandler} />
            </Container>
        </>
    );
};

export default Chat;