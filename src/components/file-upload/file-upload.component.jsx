import React, { useState, useEffect } from 'react';


// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { useNavigate } from "react-router-dom";
import './file-upload.scss';




const FileUpload = () => {
  const navigate = useNavigate();
  const hiddenFileInput = React.useRef(null);


  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const [posts, setPosts] = useState([]);



  // onchange event
  const fileType = ['application/pdf'];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
      }
      else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else {
      console.log('select your file');
    }
  }

  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  //        .then((response) => response.json())
  //        .then((data) => {
  //           console.log(data);
  //           setPosts(data);
  //        })
  //        .catch((err) => {
  //           console.log(err.message);
  //        });
  //  }, []);

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    }
    else {
      setViewPdf(null);
    }
  }

  // navigate with id to chat window



  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    console.log({ fileUploaded })
    if (fileUploaded) {
      if (fileUploaded && fileType.includes(fileUploaded.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(fileUploaded);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
        console.log('herererere')

      }
      else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else {
      console.log('select your file');
    }
    // props.handleFile(fileUploaded);
  };


  return (
    <>
      <div className='file-container'>
        {/* <form className='form-group' onSubmit={handlePdfFileSubmit}>
       <div className='upload-wrapper'>
        <input type="file" className='input-file'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <button type="submit" className='btn btn-success btn-lg'>
          UPLOAD
        </button>
        </div>
      </form>
      <br></br> */}
        <form className='form-group' onSubmit={handlePdfFileSubmit}>
          <h4>Upload a file and see the magic</h4>
          <div className='upload-container'>
            <div className='upload-icon'> <img src={require('../../assets/icons/upload.png')} className="upload-logo" /></div>
            <div className='primary-text'>Select a file or drag and drop here</div>
            <div className='secondary-text'>PDF file size no more than 10MB</div>
            <button className='btn btn-success btn-md upload-btn' onClick={handleClick}>
              Upload
            </button>
          </div>
        </form>

        <input type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
    </>
  )

}

export default FileUpload;
