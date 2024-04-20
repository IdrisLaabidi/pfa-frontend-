import React, { useEffect, useState, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import MessagingComp from '../../components/meetMessenging/MessagingComp';
import styles from '../Meet/MeetPageStyles.module.css';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = 'https://meetserver.onrender.com';
const socket = io(SERVER_URL);

const MeetPage = () => {
  const roomId = "10";
  // Use state to keep track of users in the room
  const [usersInRoom, setUsersInRoom] = useState([]);
  // Use state to manage the video streams keyed by user IDs
  const [streams, setStreams] = useState({});
  // Use states to manage mute and camera status
  const [isMuted,setIsMute] = useState(false);
  const [isCameraOff,setIsCameraOff] = useState(false);
  //Use state to show or hide sideMessagesComp
  const [showMessages,setShowMessages] = useState(false);
  // Use a ref to persist the Peer object across renders without triggering re-renders.
  const myPeerRef = useRef(null);

  const myStreamRef = useRef(null);

  const messageAreaRef = useRef(null);
  // Use an object to keep track of peer connections.
  const peers = {};

  const peersRef = useRef({}); // Use ref to persist peers object

  const userData = JSON.parse(sessionStorage.getItem('user'))

  const navigate = useNavigate();

  /*we used useMemo hook because it allows us to memorize result of a compuation which in our case iteraring 
  through streams array of objects is a considered as a computation function
  rendering video elements involves iterating over the streams object, 
  and memoizing this operation can prevent unnecessary 
  re-execution when other parts of the component state change*/
  const videos = useMemo(
    () => Object.entries(streams).map(([userId, stream]) => (
      <video
        key={userId}
        playsInline
        autoPlay
        muted={userId === myPeerRef.current?.id}
        ref={(video) => {
          if (video) video.srcObject = stream;
        }}
      />
    )),
    [streams]
  );

  // Toggle visibility of messages
  const toggleMessages = () => setShowMessages(!showMessages);

  // Toggle mute state for local stream
  const toggleMute = () => {
    myStreamRef.current.getAudioTracks()[0].enabled = isMuted;
    setIsMute(!isMuted);
  };

  // Toggle camera state for local stream
  const toggleCamera = () => {
    myStreamRef.current.getVideoTracks()[0].enabled = isCameraOff;
    setIsCameraOff(!isCameraOff);
  };

  // Function to add a video stream to the streams state.
  const addVideoStream = (stream, userId) => {
    setStreams(prevStreams => ({ ...prevStreams, [userId]: stream }));
  };

  /*In this function, setStreams is called with a function that filters out the userId from the previous state. 
  Object.entries(prevStreams) converts the streams object into an array of [key, value] pairs, .filter(([key]) => key !== userId) 
  filters out the entry with the userId, and Object.fromEntries() converts it back into an object. 
  This effectively removes the key-value pair associated with the userId from the streams state.*/
  const removeVideoStream = (userId) => {
    console.log(userId)
    setStreams((prevStreams) => {
      const updatedStreams = Object.fromEntries(
        Object.entries(prevStreams).filter(([key]) => key !== userId)
      );
      return updatedStreams;
    });

    if (peersRef.current[userId]) {
      peersRef.current[userId].close();
      delete peersRef.current[userId];
    }
  };

  // Connect to a new user and add their video stream
  const connectToNewUser = (userId, stream) => {
    const call = myPeerRef.current.call(userId, stream);
    call.on('stream', userVideoStream => {
      addVideoStream(userVideoStream, userId);
    });
    call.on('close', () => {
      removeVideoStream(userId);
    });
    peersRef.current[userId] = call;
  };

  // Handle hang up action
  const hangUp = () => {
    if (myStreamRef.current) {
      myStreamRef.current.getTracks().forEach(track => track.stop());
    }
    socket.emit('User left', myPeerRef.current.id);
    if (myPeerRef.current) {
      myPeerRef.current.destroy();
    }
    socket.off();
    Object.values(peersRef.current).forEach(peer => {
      if (peer && peer.close) {
        peer.close();
      }
    });
    navigate('/MeetingEndedPage');
  };

  useEffect(() => {
    const uniqueUserId = userData._id;
    // Initialize the Peer object with the user ID.
    myPeerRef.current = new Peer(uniqueUserId, {});
    // Request access to the local video and audio.
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(userStream => {
      myStreamRef.current = userStream;
      toggleMute();
      toggleCamera();
      // Add the local stream to the streams state.
      addVideoStream(userStream, uniqueUserId);
      myPeerRef.current.on('call', call => {
        call.answer(userStream);
        call.on('stream', userVideoStream => {
          addVideoStream(userVideoStream, call.peer);
        });
      });
      // when a new user joins the room, add them to the usersInRoom state and connect to them.
      socket.on('user-joined', userId => {
        setUsersInRoom(users => [...users, userId]);
        connectToNewUser(userId, userStream);
      });
    });
    // When the Peer object is ready, join the room with the user ID.
    myPeerRef.current.on('open', () => {
      socket.emit('join-room', uniqueUserId, roomId);
    });

    // When a user leaves the room, remove them from the usersInRoom state and their video stream.
    socket.on('user-left', userLeftId => {
      console.log('User left:', userLeftId); // Debug: Log when a user leaves
      setUsersInRoom(users => users.filter(user => user !== userLeftId));
      removeVideoStream(userLeftId);
    });
    socket.on('users-in-room', (users) => {
      setUsersInRoom(users);
    });
    // Cleanup on component unmount
    return () => {
      if (myPeerRef.current) {
        myPeerRef.current.destroy();
      }
      socket.off('user-joined');
      socket.off('user-left');
      Object.values(peersRef.current).forEach(peer => {
        if (peer && peer.close) {
          peer.close();
        }
      });
    };
  }, [roomId]);

  return (
    <div className={styles.MeetContainer}>
      <div id="videoGrid" className={styles.videoGrid}>
        {videos}
      </div>
      <div className={`${styles.MessagingComp} ${showMessages ? styles.visible : styles.hidden}`}>
        <MessagingComp />
      </div>
      <div className={styles.StreamControls}>
        <button onClick={toggleMute}>{!isMuted ? 'Mute' : 'Unmute'}</button>
        <button onClick={toggleCamera}>{isCameraOff ? 'Show Camera' : 'Hide Camera'}</button>
        <button onClick={toggleMessages}>{showMessages ? 'Hide Messages' : 'Show Messages'}</button>
        <button style={{ backgroundColor: 'red' }} onClick={hangUp}>Hang Up</button>
      </div>
    </div>
  );
};

export default MeetPage;