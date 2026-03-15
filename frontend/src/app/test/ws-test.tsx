'use client';

import { useEffect, useState, useRef } from "react";
import { webSocket } from "../../socket";

const WsTest = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [webSocketReady, setWebSocketReady] = useState(false);

    useEffect(() => {
        webSocket.on('connect_error', (err) => {
            console.log(`socket: connect_error due to ${err.message}`);
        });

        webSocket.on('connect', () => {
            setWebSocketReady(true);
            console.log(`socket: connected with id ${webSocket.id}`);
        });

        webSocket.on('disconnect', () => {
            setWebSocketReady(false);
            console.log(`socket: disconnected`);
        });

        // Log message from server
        webSocket.on('message', (message) => {
            setServerMessage(message.data);
            console.log(`socket: message received '${message.data}'`);
        });

        return () => {
            webSocket.disconnect();
        };
    }, [webSocket]);

    if (!webSocketReady) {
        return (
            <div>
                <h1>Connecting to server...</h1>
            </div>
        )
    } else if (serverMessage === "") {
        return (
            <div>
                <h1>Connected to server!</h1>
                <h1>Waiting for message...</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Connected to server!</h1>
                <h1>Message received: {serverMessage}</h1>
            </div>
        );
    }
};

export default WsTest;