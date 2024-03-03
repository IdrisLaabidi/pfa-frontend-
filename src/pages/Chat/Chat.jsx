import React from 'react'
import styles from './Chat.module.css';
import { io } from 'socket.io-client';
import { useRef, useState, useEffect, useMemo } from 'react';

const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

const Chat = () => {
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const sendMessage = ()=>{
        if(message!== ''){
            const messageObj = {text : message , sender : 'self' , id : socket.id}
            socket.emit('chat message',messageObj);
            setMessage('');
        }
    }
    useEffect(()=>{
        socket.on('chat message',(newMessage)=>{
            if(newMessage.id === socket.id){
                newMessage.sender = 'self'
            }else{
                newMessage.sender = 'other'
            }
            setMessages(messages =>[...messages,newMessage]);
        })
        const handleKeyUpEvent =  (e)=>{

        }
    },[messages]
    )
    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesArea}>
            </div>
            <div className={styles.sendMessageContainer}>
                <input 
                    type='text' 
                    placeholder='Type your message here ...' 
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>
                    Send message
                </button>
            </div>
        </div>
  )
}

export default Chat
