import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import socket from "./socket";

function Room() {
  const { id } = useParams();  
  const peer = new Peer();

  const localstream = useRef();
  const remoteStream = useRef();

  const user = prompt("Enter your name");


  useEffect(()=>{
     navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      localstream.current.srcObject = stream;
      peer.on("call", (call) => {

        call.answer(stream);

        call.on("stream", (userVideoStream) => {
         remoteStream.current.srcObject = userVideoStream;
        });
      });
  
      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
    });
  },[])
 
  
  const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    call.on("stream", (userVideoStream) => {
     remoteStream.current.srcObject = userVideoStream;
    });
  };
  
  peer.on("open", (ID) => {
    console.log('my id is' + id);
    socket.emit("join-room", id, ID, user);
  });
  


  return (
    <div className="App">
      <video autoPlay playsInline ref={localstream}></video>
      <video autoPlay playsInline ref={remoteStream}></video>
    </div>
  );
}

export default Room;
