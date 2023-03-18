import React, { useEffect, useState, useRef } from 'react';
import './chat-window.scss';
import { useLocation } from "react-router-dom";
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import Header from '../header/header.component';

const ChatWindow = ({ socket }) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [message, setMessage] = useState("")
  const handleTyping = () => socket.emit("typing", `${localStorage.getItem("userName")} is typing`)

  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(() => {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message",
        {
          text: message,
          name: localStorage.getItem("userName"),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id
        }
      )
    }
    setMessage("")
  }
  const { state } = useLocation();
  console.log({state})
  return (
    <>
    <Header />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="chat-container">

          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-lg-6 col-xl-6 margin-padding-0">

              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Chat</h5>
                </div>
                <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "463px", overflow: "auto" }}>
                  <div className="divider d-flex align-items-center mb-4">
                    <p className="text-center mx-3 mb-0" style={{ color: "#a2aab7" }}>Today</p>
                  </div>
                  <div className="d-flex flex-row justify-content-start">
                    <img src={require('../../assets/icons/bot.png')}
                      alt="avatar 1" style={{ width: "28px", height: "100%", marginLeft: "6px" }} />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bot-cls" style={{ backgroundColor: "#86DBEB" }}>Welcome to  Law Genius</p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-start">
                    <img src={require('../../assets/icons/bot.png')}
                      alt="avatar 1" style={{ width: "28px", height: "100%", marginLeft: "6px" }} />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3 bot-cls" style={{ backgroundColor: "#86DBEB" }}>Start conversation to get rich insights from the case</p>
                    </div>
                  </div>

                  {messages.map(message => (
                    message.name === localStorage.getItem("userName") ? (
                      //     <div className="message__chats" key={message.id}>
                      //   <p className='sender__name'>You</p>
                      //   <div className='message__sender'>
                      //       <p>{message.text}</p>
                      //   </div>
                      // </div>

                      <div className="d-flex flex-row justify-content-end">
                        <div key={message.id}>
                          <p className="small p-2 me-3 mb-1 text-white rounded-3 user-cls">{message.text}
                          </p>
                        </div>
                      </div>

                    ) : (
                      //     <div className="message__chats" key={message.id}>
                      //   <p>{message.name}</p>
                      //   <div className='message__recipient'>
                      //       <p>{message.text}</p>
                      //   </div>
                      // </div>

                      <div className="d-flex flex-row justify-content-start" key={message.id}>
                        <img src={require('../../assets/icons/bot.png')}
                          alt="avatar 1" style={{ width: "28px", height: "100%", marginLeft: "6px" }} />
                        <div>
                          <p className="small p-2 ms-3 mb-1 rounded-3 bot-cls" style={{ backgroundColor: "#86DBEB" }}>{message.text}</p>
                        </div>
                      </div>
                    )
                  ))}




                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <img src={require('../../assets/icons/bot.png')}
                    alt="avatar 3" style={{ width: "40px", height: "100%" }} />
                  <form className='form' onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder='Write message'
                      className='message form-control form-control-lg'
                      value={message}
                      style={{ width: "570px" }}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={handleTyping}
                    />
                    {/* <button className="sendBtn">SEND</button> */}
                  </form>
                </div>
              </div>

            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 pdf-height margin-padding-0">
              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
                <Viewer fileUrl={state}
                  plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}


export default ChatWindow;


