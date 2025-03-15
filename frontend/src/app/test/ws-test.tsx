'use client';

import { useEffect, useState, useRef } from "react";
// import WebSocket from "ws";

const WsTest = () => {
    const [data, setData] = useState();
    const [serverMessage, setServerMessage] = useState("");
    const [webSocketReady, setWebSocketReady] = useState(false);

    const [webSocket, setWebSocket] = useState(new WebSocket("ws://localhost:8080/ws"));

    useEffect(() => {
        console.log("testing useEffect");
        webSocket.onopen = (event) => {
            setWebSocketReady(true);
            console.log("WebSocket is open now.");
        };

        webSocket.onmessage = function (event) {
            setServerMessage(event.data);
            console.log("Server message: ", serverMessage);
        };

        webSocket.onclose = function (event) {
            setWebSocketReady(false);
            setTimeout(() => {
                setWebSocket(new WebSocket("ws://localhost:8080/ws"));
            }, 1000);
        };

        webSocket.onerror = function (err) {
            console.log("Socket encountered error: ", err , "Closing socket");
            setWebSocketReady(false);
            webSocket.close();
        };

        return () => {
            webSocket.close();
        }

    }, [webSocket])


    if (!webSocketReady) {
        return <h1>Could not connect to server ...</h1>
    } else if (serverMessage === "") {
        return <h1>Waiting for server message ...</h1>
    } else {
        return (
            <div>
                <h1>Websocket is connected with message: {serverMessage}</h1>

            </div>
        );
        
    }
};

export default WsTest;