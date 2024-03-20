import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import attach from '../../assets/attach.png';
import sendImage from '../../assets/sendImage.png';
import send from '../../assets/send.png';
import MessageObject from '../../components/message/messageObject';
import styles from './Chat.module.css';
import useFetch from '../../hooks/useFetch';

const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [usersProject, setUsersProject] = useState([]);
    const messageAreaRef = useRef();
    const userId = localStorage.getItem('user_id');

    const { data: projectsData, isPending: isPendingProjects } = useFetch(`http://localhost:4000/api/projects/myprojects/${userId}`);

    useEffect(() => {
        if (!isPendingProjects && projectsData) {
            setProjects(projectsData);
        }
    }, [projectsData, isPendingProjects]);

    const handleSelectedProject = (projectId) => {
        setSelectedProject(projectId);
    };

    const { data: UsersAssignedToaProject, isPending: isPendingUsers } = useFetch(`http://localhost:4000/api/projects/projusers/${selectedProject}`);

    useEffect(() => {
        if (!isPendingUsers && UsersAssignedToaProject) {
            const newUsersProject = UsersAssignedToaProject.map(user => user._id);
            setUsersProject(newUsersProject);
        }
    }, [UsersAssignedToaProject, isPendingUsers]);

    const sendMessage = () => {
        if (message !== '' && selectedProject) {
            const messageObj = {
                content: message,
                sender: userId,
                sentTo: usersProject, 
                project: selectedProject,
                sentAt: Date.now(),
                who: ''
            };
            socket.emit('chat message', messageObj);
            setMessage('');
        }
    };

    const { data: allMessagesData, isPending: isPendingMessages } = useFetch(`http://localhost:4000/api/messages/allMessage/${selectedProject}`);

    useEffect(() => {
        if (!isPendingMessages && allMessagesData) {
            const formattedMessages = allMessagesData.map(mssg => ({
                ...mssg,
                sender: mssg.sender === userId ? 'self' : 'other'
            }));
            setMessages(formattedMessages);
        }
    }, [allMessagesData, isPendingMessages, userId]);

    useEffect(() => {
        const newMessageHandler = (newMessage) => {
            setMessages(prevMessages => [
                ...prevMessages,
                { ...newMessage, sender: newMessage.sender === userId ? 'self' : 'other' }
            ]);
        };

        socket.on('chat message', newMessageHandler);

        return () => {
            socket.off('chat message', newMessageHandler);
        };
    }, [userId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
    }, [sendMessage]);

    const scrollToBottom = () => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    };

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
