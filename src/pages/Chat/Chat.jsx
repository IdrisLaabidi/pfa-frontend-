import React from 'react'
import './Chat.css';
import { io } from 'socket.io-client';
import { useRef, useState, useEffect, useMemo } from 'react';

const SERVER_URL = 'http://localhost:8080';
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
        const handleEnterKeyUp =  (e)=>{
            if(e.keyCode===13){
                document.getElementById('sendMessageButton').click();
            }
        }
        document.getElementById("inputMessage").addEventListener("keyup",handleEnterKeyUp);
        return()=>{
            document.getElementById("inputMessage").removeEventListener("keyup",handleEnterKeyUp);
            socket.off();
        };
    },[messages]
    )
    return (
        <div className='chatContainer'>
            <div className='messagesArea'>
            </div>
            <div className='sendMessageContainer'>
                <input 
                    id='inputMessage'
                    type='text' 
                    placeholder='Type your message here ...' 
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />
                <button 
                id='sendMessageButton'
                onClick={sendMessage}
                type='submit'
                >
                    Send message
                </button>
            </div>
        </div>
  )
}

export default Chat
