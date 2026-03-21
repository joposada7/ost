'use client';

import { useEffect, useState, useRef } from "react";
import webSocket from "../../socket";

const WsTest = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [webSocketReady, setWebSocketReady] = useState(false);

    useEffect(() => {
        console.log(`socket: readyState = ${webSocket.readyState}`);
        webSocket.addEventListener('open', (event) => {
            setWebSocketReady(true);
            console.log('socket: connected!');

            // Debug: send a hello to the backend
            webSocket.send('Hello to the backend server!');
        });
        webSocket.addEventListener('close', (event) => {
            setWebSocketReady(false);
            console.log(`socket: connection closed with code ${event.code} (${event.reason})`);
        });

        // Log message from server
        webSocket.addEventListener('message', (event) => {
            setServerMessage(event.data);
            console.log(`socket: message received '${event.data}'`);
        });
        
        return () => {
            webSocket.close();
        };
    }, [webSocket]);

    if (!webSocketReady) {
        return (
            <div>
                <h1>Connecting to server...</h1>
            </div>
        );
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