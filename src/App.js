import logo from './logo.svg';
import './App.css';
import FileUpload from './components/file-upload/file-upload.component';
import ChatWindow from './components/chat-window/chat-window.component';
import RecentUploads from './components/recent-uploads/recent-uploads.component';
import Login from './components/login/login.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<FileUpload />} />
          <Route path="chat/:id" element={<ChatWindow socket={socket} />} />
          <Route path="uploads" element={<RecentUploads />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
