import {createContext, useEffect, useState} from "react";
import {io} from "socket.io-client";

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        console.log(newSocket);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const SocketContext = createContext(io("http://localhost:3000"))