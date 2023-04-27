import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthProvider";
import WebSocket from "isomorphic-ws";
export const ChatContext = createContext({
    ws: null,
    partner: null,
    socketMessage: null,
    allMessageList: [],
    setWs: () => { },
    setPartner: () => { },
    setSocketMessage: () => { },
    setAllMessageList: () => { },
});

const ChatProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [partner, setPartner] = useState(null);
    const [connected, setConnected] = useState(false);
    const [socketMessage, setSocketMessage] = useState(null);
    const [allMessageList, setAllMessageList] = useState([]);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        if (authCtx.acToken && !connected) {
            console.log("trying to set ws...");
            const initialWs = new WebSocket("wss://pbeta.cu-freelance.tech/v1/chat/ws");
            setWs(initialWs);
            initialWs.onopen = async () => {
                const loginMessage = {
                    type: 1,
                    token: authCtx.acToken,
                }
                initialWs.send(JSON.stringify(loginMessage));
            }
            initialWs.onerror = (ev) => {
                console.error("Got error", ev);
            };
            initialWs.onclose = (ev) => {
                console.debug(`WebSocket disconnected at code ${ev.code}`);
                // initialWs.close();
                if (ev.code != 1000) setConnected(false);
            };
            initialWs.onmessage = async (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log(data);
                    if (data.connect_success === true) {
                        console.log("Handshake is completed!");
                        setConnected(true);
                    }
                    else if (data.type == 4) {
                        setAllMessageList((prev) => [...prev, { sender: data.sender_id, message: data.message }]);
                        // allMessageList.push({ sender: data.sender_id, message: data.message });
                        setSocketMessage({ sender: data.sender_id, message: data.message });
                    }
                }
                catch (err) {
                    console.log(event);
                    setSocketMessage(event.data);
                }
            }
        }
    }, [authCtx.acToken, connected]);
    return <ChatContext.Provider value={{
        ws,
        partner,
        socketMessage,
        allMessageList,
        setWs,
        setPartner,
        setSocketMessage,
        setAllMessageList,
    }}>
        {children}
    </ChatContext.Provider>
}

export default ChatProvider;