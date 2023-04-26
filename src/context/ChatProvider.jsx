import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthProvider";

export const ChatContext = createContext({
    ws: null,
    partner: null,
    socketMessage: null,
    setWs: () => { },
    setPartner: () => { },
    setSocketMessage: () => { },
});

const ChatProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [partner, setPartner] = useState(null);
    const [connected, setConnected] = useState(false);
    const [socketMessage, setSocketMessage] = useState(null);
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
                if (ev.code != 1000) setConnected(false);
            };
            initialWs.onmessage = async (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                if (data.type === 4) setSocketMessage(data.message);
                else if (data.connect_success === true) {
                    console.log("Handshake is completed!");
                    const testMessage = {
                        type: 4,
                        target: "e814e268-dde4-4755-98be-6d704cb4b7f6",
                        message: "testMessage",
                    }
                    initialWs.send(JSON.stringify(testMessage));
                    console.log("the message has been send");
                    setConnected(true);
                }
            }
        }
    }, [authCtx.acToken, connected]);
    return <ChatContext.Provider value={{
        ws,
        partner,
        socketMessage,
        setWs,
        setPartner,
        setSocketMessage,
    }}>
        {children}
    </ChatContext.Provider>
}

export default ChatProvider;