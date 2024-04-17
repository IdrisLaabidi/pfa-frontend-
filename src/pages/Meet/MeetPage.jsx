import React, { useEffect, useState, useRef, useMemo } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import MessagingComp from '../../components/meetMessenging/MessagingComp';
import styles from '../Meet/MeetPageStyles.module.css';

const SERVER_URL = 'https://meetserver.onrender.com';
const socket = io(SERVER_URL);

const MeetPage = () => {
  const roomId = "10";
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [streams, setStreams] = useState({});
  const [isMuted, setIsMute] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const myPeerRef = useRef(null);
  const myStreamRef = useRef(null);
  const messageAreaRef = useRef(null);
  const peers = {};

  const videos = useMemo(
    () =>
      Object.entries(streams).map(([userId, stream]) => {
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.playsInline = true;
        videoElement.autoPlay = true;
        videoElement.muted = (userId === myPeerRef.current.id); // Mute if it's the local user's stream
        return videoElement;
      }),
    [streams]
  );

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const toggleMute = () => {
    setIsMute(!isMuted);
    if (myStreamRef.current) {
      myStreamRef.current.getAudioTracks()[0].enabled = !isMuted;
    }
  };

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    if (myStreamRef.current) {
      myStreamRef.current.getVideoTracks()[0].enabled = !isCameraOff;
    }
  };

  const addVideoStream = (stream, userId) => {
    setStreams(prevStreams => ({ ...prevStreams, [userId]: stream }));
    if (userId === myPeerRef.current.id) {
      // Mute the video element if it's the local user's stream
      const videoElement = document.createElement('video');
      videoElement.muted = true;
      videoElement.srcObject = stream;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();
      });
      document.getElementById('videoGrid').append(videoElement);
    }
  };

  const connectToNewUser = (userId, stream) => {
    const call = myPeerRef.current.call(userId, stream);
    call.on('stream', userVideoStream => {
      addVideoStream(userVideoStream, userId);
    });
    call.on('close', () => {
      removeVideoStream(userId);
    });
    peers[userId] = call;
  };

  const removeVideoStream = (userId) => {
    setStreams((prevStreams) => {
      const updatedStreams = Object.fromEntries(
        Object.entries(prevStreams).filter(([key]) => key !== userId)
      );
      return updatedStreams;
    });
    if (peers[userId]) {
      peers[userId].close();
      delete peers[userId];
    }
  };

  useEffect(() => {
    const uniqueUserId = uuidv4();
    myPeerRef.current = new Peer(uniqueUserId, {});
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(userStream => {
      myStreamRef.current = userStream;
      toggleMute();
      toggleCamera();
      addVideoStream(userStream, uniqueUserId);
      myPeerRef.current.on('call', call => {
        call.answer(userStream);
        call.on('stream', userVideoStream => {
          addVideoStream(userVideoStream, call.peer);
        });
      });
      socket.on('user-joined', userId => {
        setUsersInRoom(users => [...users, userId]);
        connectToNewUser(userId, userStream);
      });
    });

    myPeerRef.current.on('open', () => {
      socket.emit('join-room', uniqueUserId, roomId);
    });

    socket.on('user-left', userLeftId => {
      setUsersInRoom(users => users.filter(user => user !== userLeftId));
      removeVideoStream(userLeftId);
    });

    return () => {
      if (myStreamRef.current) {
        myStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (myPeerRef.current) {
        myPeerRef.current.destroy();
      }
      socket.off();
    };
  }, [roomId]);

  return (
    <div className={styles.MeetContainer}>
      <div id="videoGrid" className={styles.videoGrid}>
        {/* videos will be appended to this div */}
      </div>
      <div className={`${styles.MessagingComp} ${showMessages ? styles.visible : styles.hidden}`}>
        <MessagingComp />
      </div>
      <div className={styles.StreamControls}>
        <button onClick={toggleMute}>{!isMuted ? 'Mute' : 'Unmute'}</button>
        <button onClick={toggleCamera}>{!isCameraOff ? 'Turn On Camera' : 'Turn Off Camera'}</button>
        <button onClick={toggleMessages}>{showMessages ? 'Hide Messages' : 'Show Messages'}</button>
      </div>
    </div>
  );
};

export default MeetPage;