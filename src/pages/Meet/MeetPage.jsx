import React, { useEffect, useState, useRef , useMemo } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import MessagingComp from '../../components/meetMessenging/MessagingComp'
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
  const navigate = useNavigate()

  /*we used useMemo hook because it allows us to memorize result of a compuation which in our case iteraring 
  through streams array of objects is a considered as a computation function
  rendering video elements involves iterating over the streams object, 
  and memoizing this operation can prevent unnecessary 
  re-execution when other parts of the component state change*/
  const videos = useMemo(
    () =>
      Object.entries(streams).map(([userId, stream]) => (
        <video
          key={userId}
          playsInline
          autoPlay
          ref={(video) => {
            if (video) {
              video.srcObject = stream;
            }
          }}
        />
      )),
    [streams]

  );
  const toggleMessages = () => {
    setShowMessages(!showMessages);

  }
  const toggleMute = () => {
    myStreamRef.current.getAudioTracks()[0].enabled = isMuted;
    setIsMute(!isMuted);
  }
  const toggleCamera = () => {
    myStreamRef.current.getVideoTracks()[0].enabled = isCameraOff
    setIsCameraOff(!isCameraOff);
  }
  // Function to add a video stream to the streams state.
  const addVideoStream = (stream, userId) => {
    console.log('Adding video stream for user:', userId);
    setStreams(prevStreams => ({ ...prevStreams, [userId]: stream }));
  };
  // Function to handle the connection to a new user.
  const connectToNewUser = (userId, stream) => {
    // Call the new user with the local stream.
    const call = myPeerRef.current.call(userId, stream);
    console.log('New user connected:', userId);
    // When the new user's stream is received, add it to the streams state.
    call.on('stream', userVideoStream => {
      addVideoStream(userVideoStream, userId);
    });
    // When the call is closed, remove the user's video stream.
    call.on('close', () => {
      console.log('Disconnected:', userId);
      removeVideoStream(userId);
    });
    // Store the call object in the peers object.
    peers[userId] = call;
  };
  /*In this function, setStreams is called with a function that filters out the userId from the previous state. 
  Object.entries(prevStreams) converts the streams object into an array of [key, value] pairs, .filter(([key]) => key !== userId) filters out the entry with the userId, 
  and Object.fromEntries() converts it back into an object. 
  This effectively removes the key-value pair associated with the userId from the streams state.*/
  const removeVideoStream = (userId) => {                           
    console.log('Removing video stream for user:', userId);
    console.log('streams before removing'+userId+'are '+ streams)
    setStreams((prevStreams) => {
      const updatedStreams = Object.fromEntries(
        Object.entries(prevStreams).filter(([key]) => key !== userId)
      );
      return updatedStreams;
    });
    // Close the peer connection if it exists and remove it from the peers object.
    if (peers[userId]) {
      peers[userId].close();
      delete peers[userId];
    }
  };
  /*const hangUp = ()=>{
    window.location.href()
  }*/
  const hangUp = () => {
    // Stop all media tracks
    if (myStreamRef.current) {
      myStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Emit an event to the server to inform other users that this user has hung up
    socket.emit('User left', myPeerRef.current.id);

    // Perform any additional cleanup if necessary, such as navigating the user away from the page
    // window.location.href = '/some/other/page';

    // Destroy the Peer object
    if (myPeerRef.current) {
      myPeerRef.current.destroy();
    }

    // Disconnect from the socket
    socket.off();

    // Close all peer connections
    Object.values(peers).forEach(peer => {
      if (peer && peer.close) {
        peer.close();
      }
    });
    //After hanging up locate user to projects page 
    navigate('/MeetingEndedPage')
  };
  // useEffect hook to handle component side effects.
  useEffect(() => {
    // Generate a unique user ID for the local user.
    const uniqueUserId = uuidv4();
    // Initialize the Peer object with the unique user ID.
    myPeerRef.current = new Peer(uniqueUserId, {});
    let stream;
    // Request access to the local video and audio.
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(userStream => {
      stream = userStream;
      myStreamRef.current = userStream;
      toggleMute();
      toggleCamera();
      // Add the local stream to the streams state.
      addVideoStream(stream, uniqueUserId);
      // Handle incoming calls.
      myPeerRef.current.on('call', call => {
        call.answer(stream);
        call.on('stream', userVideoStream => {
          addVideoStream(userVideoStream, call.peer);
        });
      });
      // When a new user joins the room, add them to the usersInRoom state and connect to them.
      socket.on('user-joined', userId => {
        console.log('User joined:', userId);
        setUsersInRoom(users => [...users, userId]);
        connectToNewUser(userId, stream);
      });
    });
    // When the Peer object is ready, join the room with the unique user ID.
    myPeerRef.current.on('open', () => {
      socket.emit('join-room', uniqueUserId, roomId);
    });
    // When a user leaves the room, remove them from the usersInRoom state and their video stream.
    socket.on('user-left', userLeftId => {
      console.log('User left:', userLeftId);
      setUsersInRoom(users => users.filter(user => user !== userLeftId));
      removeVideoStream(userLeftId);
    });
    // Cleanup function to destroy the Peer object and turn off socket listeners when the component unmounts.
    return () => {
      if (myPeerRef.current) {
        myPeerRef.current.destroy();
      }
      socket.off();
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
        <button style={{backgroundColor:'red'}} onClick={hangUp}>Hang Up</button> {/* Hang up button */}
      </div>
    </div>
  );
};

export default MeetPage;