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
});

const ChatProvider = ({ children }) => {
    const [ws, setWs] = useState(null);
    const [partner, setPartner] = useState(null);
    const [connected, setConnected] = useState(false);
    const [socketMessage, setSocketMessage] = useState(null);
    const authCtx = useContext(AuthContext);
    let initialWs;
    useEffect(() => {
        if (authCtx.acToken && !connected) {
            console.log("trying to set ws...");
            initialWs = new WebSocket("wss://pbeta.cu-freelance.tech/v1/chat/ws");
            initialWs.onopen = async () => {
                const loginMessage = {
                    type: 1,
                    token: authCtx.acToken,
                }
                initialWs.send(JSON.stringify(loginMessage));
            }
            initialWs.onmessage = async (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                if (data.connect_success === true) {
                    console.log("Handshake is completed!");
                    setConnected(true);
                }
                else if (data.type === 4) setSocketMessage(data.message);
            }
            initialWs.onerror = (ev) => {
                console.error("Got error", ev);
            };
            initialWs.onclose = (ev) => {
                console.debug(`WebSocket disconnected at code ${ev.code}`);
            };
        }
    }, [authCtx.acToken])
    useEffect(() => {
        if (connected === true) {
            console.log("ws is set!"), setWs(initialWs);
        }
    }, [connected])
    return <ChatContext.Provider value={{
        ws,
        partner,
        socketMessage,
        setWs,
        setPartner,
    }}>
        {children}
    </ChatContext.Provider>
}

export default ChatProvider;