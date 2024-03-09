import React from 'react'
import { io } from 'socket.io-client';
import { useRef, useState, useEffect, useMemo } from 'react';
import attach from '../../assets/attach.png';
import sendImage from '../../assets/sendImage.png';
import send from '../../assets/send.png';
import MessageObject from '../../components/message/messageObject';
import styles from './Chat.module.css';
import Cookies from 'js-cookie';
const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

const Chat = () => {
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const messageAreaRef = useRef();
    const userId = Cookies.get('user_id');
    const sendMessage = ()=>{
        if(message!== ''){
            const messageObj = {
                content : message,
                sender :userId,
                sentTo : [],
                sentAt : Date.now(),
                who : ''
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
      useEffect(() => {
        socket.on('allMessage', (allMessages) => {
            const formattedMessages = allMessages.map((mssg) => ({
                ...mssg,
                sender: mssg.sender === userId ? 'self' : 'other'
            }));
            setMessages(formattedMessages);
        });

        socket.on('chat message', (newMessage) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { ...newMessage, sender: newMessage.sender === userId ? 'self' : 'other' }
            ]);
        });

        return () => {
            socket.off('allMessage');
            socket.off('chat message');
        };
    }, [userId]);
    useEffect(()=>{
        scrollToBottom();
        socket.on('chat message',(newMessage)=>{
            console.log('senderrrrrrrrr'+newMessage.sender);
            if(newMessage.sender === userId){
                newMessage.sender = 'self'
            }else{
                newMessage.sender = 'other'
            }
            setMessages(messages =>[...messages,newMessage]);
            
        })
        
    },[messages]
    )
    useEffect(() => {
        const handleEnterKeyUp = (e) => {
            if (e.keyCode === 13) {
                sendMessage();
            }
        };
        const inputElement = document.getElementById('inputMessage');
        inputElement.addEventListener('keyup', handleEnterKeyUp);
        return () => {
            inputElement.removeEventListener('keyup', handleEnterKeyUp);
        };
    }, []);
    return (
        <div className={styles.chatContainer}>
            <div className={styles.headerContainer}>
                    Group Chat
            </div>
            <div className={styles.messagesArea} ref={messageAreaRef}>
                
                {messages.map((mssg,index)=>{
                    return(
                        <MessageObject key={index} message={mssg} />
                    )
                })}
            </div>
            <div id={styles.sendMessageContainer}>    
                <input 
                    id='inputMessage'
                    className={styles.inputMessage}
                    type='text' 
                    placeholder='Type your message here ...'
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />
               <button className={styles.attachButton}> <img src={attach} className={styles.attach}/></button>
               <button className={styles.sendImageButton}><img src={sendImage} className={styles.sendImage}/></button>
                <button 
                id='sendMessageButton'
                className={styles.sendMessageButton}
                onClick={sendMessage}
                type='submit'
                >
                    <img src={send} className={styles.sendMessage}/>
                    Send message
                </button>
            </div>
        </div>
  )
}

export default Chat
