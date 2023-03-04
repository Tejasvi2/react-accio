import React,{useState} from 'react';
import './chat-window.scss';
import { useLocation } from "react-router-dom";
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library


const ChatWindow = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { state } = useLocation();
return (
   <>
   <section style={{backgroundColor: "#eee"}}>
  <div className="chat-container">

    <div className="row d-flex justify-content-center">
      <div className="col-md-6 col-lg-6 col-xl-6 margin-padding-0">

        <div className="card" id="chat2">
          <div className="card-header d-flex justify-content-between align-items-center p-3">
            <h5 className="mb-0">Chat</h5>
          </div>
          <div className="card-body" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "463px", overflow: "auto"}}>
          <div className="divider d-flex align-items-center mb-4">
              <p className="text-center mx-3 mb-0" style={{color:"#a2aab7"}}>Today</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
              <img src={require('../../assets/icons/bot.png')}
                alt="avatar 1" style={{width: "28px", height: "100%", marginLeft: "6px" }} />
              <div>
                <p className="small p-2 ms-3 mb-1 rounded-3 bot-cls"  style={{backgroundColor: "#86DBEB"}}>Welcome to  Law Genius</p>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-start">
              <img src={require('../../assets/icons/bot.png')}
                alt="avatar 1" style={{width: "28px", height: "100%", marginLeft: "6px" }} />
              <div>
                <p className="small p-2 ms-3 mb-1 rounded-3 bot-cls"  style={{backgroundColor: "#86DBEB"}}>Start conversation to get rich insights from the case</p>
              </div>
            </div>

         

            {/* 
            right div
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Hiii, I'm good.</p>
              </div>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                alt="avatar 1" style={{width: "45px", height: "100%"}} />
            </div> */}

            

            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 user-cls">Okay then see you on sunday!!
                </p>
              </div>
              {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                alt="avatar 1" style={{width: "45px", height: "100%"}} /> */}
            </div>

          </div>
          <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
            <img src={require('../../assets/icons/bot.png')}
              alt="avatar 3" style={{width: "40px", height: "100%"}} />
            <input type="text" className="form-control form-control-lg" id="exampleFormControlInput1"
              placeholder="Type message" />
            <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
            <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
            <a className="ms-3" href="#!"><i className="fas fa-paper-plane"></i></a>
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


