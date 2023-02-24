import React,{useState, useEffect} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { ChatWindow } from '../chat-window/chat-window.component';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';



const FileUpload = () => {
  const navigate = useNavigate();
    // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);
  const [posts, setPosts] = useState([]);

  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
    }
    else{
      setViewPdf(null);
    }
  }

  // navigate with id to chat window
  const chatPage = (id) => {
    navigate(`/chat/${id}`, )
  }


  return (
    <div className='container'>
    <br></br> 
    {/* <button onClick={chatPage}>chat</button> */}
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button type="submit" className='btn btn-success btn-lg'>
          UPLOAD
        </button>
      </form>
      <br></br>
      <h4>View PDF</h4>
          <div className='pdf-container'>
              {/* show pdf conditionally (if we have one)  */}
              {viewPdf && <>
                  <div className="d-flex flex-column">
                      {/* <div className="p-6"> 
                      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
                          <Viewer fileUrl={viewPdf}
                              plugins={[defaultLayoutPluginInstance]} />
                      </Worker></div> */}
                      <div className="p-6">
                          <table className="table table-striped">
                              <thead>
                                  <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">First</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Handle</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {posts.map((val, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{val.userId}</td>
                                    <td>{val.title}</td>
                                    <td>{ new Date().getDate()}</td>
                                    <td><button onClick={() => chatPage(val.id)}>chat</button></td>
                                  </tr>
                                )
                              })}
                              </tbody>
                          </table>
                      </div>
                  </div>
      </>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      </div>

    </div>
  )

}

export default FileUpload;
