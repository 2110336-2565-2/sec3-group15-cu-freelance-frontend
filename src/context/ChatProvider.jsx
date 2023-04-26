import { createContext } from "react";

export const ChatContext = createContext(() => {
    ws: null,
        partner,
});

const ChatProvider = ({ children }) => {
    return <ChatContext.Provider>

    </ChatContext.Provider>
}