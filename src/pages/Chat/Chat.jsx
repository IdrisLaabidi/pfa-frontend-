import React from 'react'
import { io } from 'socket.io-client';
import { useRef, useState, useEffect, useMemo } from 'react';
import attach from '../../assets/attach.png';
import sendImage from '../../assets/sendImage.png';
import send from '../../assets/send.png';
import MessageObject from '../../components/message/messageObject';
import styles from './Chat.module.css';
import useFetch from '../../hooks/useFetch';

const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

const Chat = () => {
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const [selectedProject , setSelectedProject] = useState(null)
    const [projects , setProjects] = useState([]);
    const messageAreaRef = useRef();
    const userId = localStorage.getItem('user_id');
    const {data:projectsData,isPending1,error1} = useFetch(`http://localhost:4000/api/projects/myprojects/${userId}`);

    useEffect(()=>{
        if(!isPending&&projectsData){
            setProjects(projectsData)
        }
        
    },[projectsData])
    
    const handleSelectedProject = (projectId) => {
        setSelectedProject(projectId);
        console.log(projectId)
    }
    useEffect(()=>{
        if(selectedProject){

        }
    },[selectedProject])
    //creating a message object for messages display 
    const sendMessage = ()=>{
        if(message!== ''){
            console.log('here')
            const messageObj = {
                content : message,
                sender :userId,
                sentTo : [],
                project : selectedProject,
                sentAt : Date.now(),
                who : ''
            }
            socket.emit('chat message',messageObj);
            setMessage('');
        }
    }
    //when a message sent this function will scroll you down when rending new message (typical chat thing)
    const scrollToBottom = () => {
        if (messageAreaRef.current) {
          messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    };
    
    const { data:allMessagesData, isPending, error } = useFetch(`http://localhost:4000/api/messages/allMessage/${selectedProject}`)

    
    //just to know who's the sender to display message either blue or grey 
    useEffect(() => {
        if(!isPending&&allMessagesData){
            const formattedMessages = allMessagesData.map((mssg) => ({
                ...mssg,
                sender: mssg.sender === userId ? 'self' : 'other'
    
            }));
            setMessages(formattedMessages);
            console.log(messages)
        }
        //when sending message and event will trigger the server to create a message in the db
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
    },[allMessagesData,userId]);
    
    
    useEffect(()=>{
        scrollToBottom();
        socket.on('chat message',(newMessage)=>{
            if(newMessage.sender === userId){
                newMessage.sender = 'self'
            }else{
                newMessage.sender = 'other'
            }
            setMessages(messages =>[...messages,newMessage]);
        })
        return ()=>{
            socket.off('chat message')
        }
    },[messages]
    );

    useEffect(() => {
        const handleEnterKeyUp = (e) => {
            if (e.keyCode === 13) {
                console.log('ggg')
                sendMessage();
            }
        };
        const inputElement = document.getElementById('inputMessage');
        inputElement.addEventListener('keyup', handleEnterKeyUp);
        return () => {
            inputElement.removeEventListener('keyup', handleEnterKeyUp);
        };
    }, [message]);
    return (
        <div className={styles.chatContainer}>
            <aside className={styles.userProjectsGroupsContainer}>
                <h3>
                    Select a Project Group
                </h3>
                <ul>
                    {projects.map((project)=>{
                        return(
                            <li className={styles.project} key = {project._id} onClick={()=>{handleSelectedProject(project._id)}}>
                                {project.name}
                            </li>
                        )
                    })}
                </ul>
            </aside>
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
