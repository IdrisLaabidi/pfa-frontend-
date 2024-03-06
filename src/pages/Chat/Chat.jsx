import React from 'react'
import { io } from 'socket.io-client';
import { useRef, useState, useEffect, useMemo } from 'react';
import attach from '../../assets/attach.png';
import sendImage from '../../assets/sendImage.png';
import send from '../../assets/send.png';
import MessageObject from '../../components/message/messageObject';
import './Chat.css';
const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

const Chat = () => {
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const [messagesObjects,setMessagesObjects] = useState([]);
    const messageAreaRef = useRef();
    const sendMessage = ()=>{
        if(message!== ''){
            const messageObj = {
                content : message,
                sender : socket.id,
                sentTo : [],
                sentAt : Date.now()
            }
            socket.emit('chat message',messageObj);
            setMessage('');
        }
    }
    const scrollToBottom = () => {
        if (messageAreaRef.current) {
          messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
      };
    useEffect(()=>{
        scrollToBottom();
        console.log('Chat Token',localStorage.getItem("token"));
        socket.on('allMessage',(allMessages)=>{
            allMessages.map((mssg)=>{
                setMessages(messages=>[...messages,mssg])
            })
        })
        socket.on('chat message',(newMessage)=>{
            if(newMessage.sender === socket.id){
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
            <div className='headerContainer'>
                    Group Chat
            </div>
            <div className='messagesArea' ref={messageAreaRef}>
                
                {messages.map((mssg,index)=>{
                    return(
                        <MessageObject key={index} message={mssg} />
                    )
                })}
            </div>
            <div id='sendMessageContainer'>    
                <input 
                    id='inputMessage'
                    type='text' 
                    placeholder='Type your message here ...'
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />
               <button className='attachButton'> <img src={attach} className='attach'/></button>
               <button className='sendImageButton'><img src={sendImage} className='sendImage'/></button>
                <button 
                id='sendMessageButton'
                onClick={sendMessage}
                type='submit'
                >
                    <img src={send} className='sendMessage'/>
                    Send message
                </button>
            </div>
        </div>
  )
}

export default Chat
