import React, { useState, useEffect ,useRef} from 'react';
import io from 'socket.io-client';
import styles from '../../components/meetMessenging/MessagingCompStyles.module.css'
const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

function Chat() {
  console.log('hallo')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageAreaRef = useRef(null);
  const sendMessage = (e) => {
    if (message!=='') {
      const MessageObj = {text : message , sender : 'self', id : socket.id};
      socket.emit('meet chat message',MessageObj);
      setMessage('');
    }
    
  };
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  };
  
  /*we are using useEffect hook for event listening because on of its the best usage is eventlistening 
    1-we need the event handler function 
    2-add an event listener which has 2 args (event_type_string,function that handles the event)
    3-clean up the event lister
    ==> this is how useEffect is used for event listening:)
  */
  useEffect(()=>{
     scrollToBottom()
     // Listen for incoming messages
     socket.on('meet chat message', (newMessage) => {
      console.log(newMessage.id === socket.id)
      if (newMessage.id === socket.id){
        newMessage.sender = 'self';
      }else{
        newMessage.sender = 'other';
      }
      setMessages(messages=>[...messages,newMessage]);
    });
    const handleEnterKeyUp = (event)=>{
      if(event.keyCode===13){
        document.getElementById("send").click()
      }
    }
    //document.getElementById("input_mess").addEventListener("keyup",handleEnterKeyUp);
    return()=>{
      //document.getElementById("input_mess").removeEventListener("keyup",handleEnterKeyUp);
      socket.off();
    };

  },[messages])
  
  return (
    <div className={styles.messagesComp}>
      <div>
        <h2>Chat Room</h2>
        <div id="message-area" className={styles.messageArea} ref={messageAreaRef}>
          {messages.map((msg, index) => (
            msg.sender ? <div key={index} className={styles.sent}>
            {msg.text}
           </div>:  <div key={index} className={styles.received}>
             {msg.text}
            </div>          
            
          ))}
        </div>
  
        <div className={styles.inputContainer}>
          <input
            id='input_mess'
            className={styles.inputMess}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            
          />
          <button id="send" className={styles.send} type="submit" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
      
    
  
  );
}

export default Chat;  