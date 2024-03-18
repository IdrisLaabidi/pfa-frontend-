import React from 'react'
import styles from './messageObject.module.css'
const MessageObject = ({message}) => {
  const formattedTime = new Date(message.sentAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12 : true,

  });
  if(message.sender === 'self' ){
  return (
    
    <div 
      className={styles.selfMessage}
    >
      <div className={styles.sender}>{message.sender}</div>
      <div className={styles.messageContent}>{message.content}</div>
      <div>{formattedTime}</div>
    </div>
    )
}else{
  return (
    
    <div 
      className={styles.otherMessage}
    >
      <div className={styles.sender}>{message.sender}</div>
      <div className={styles.messageContent}>{message.content}</div>
      <div>{formattedTime}</div>
    </div>
    )
}}

export default MessageObject
