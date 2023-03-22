import { ChatWindow } from '../chat-window/chat-window.component';
import React, { useState, useEffect } from 'react';
import './recent-uploads.scss';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from '../header/header.component';



const RecentUploads = () => {
    const navigate = useNavigate();
    const [viewPdf, setViewPdf] = useState('data');
    const [posts, setPosts] = useState([]);
    const { state } = useLocation();
    console.log({state})

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);

        //         setPosts(data);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
        (async()=>{
            const pdfData = await getPdf();
            const postData = pdfData?.data;
            setPosts(postData);
        })();
    }, []);

    async function getPdf() {
        const username = await localStorage.getItem("userName")
        console.log({username})
        return fetch('http://18.223.213.190:5000/get_pdf_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'x-access-token': localStorage.getItem("token"),       
          },
          body: JSON.stringify({username})
        })
          .then(data => data.json())
       }


    const chatPage = (id) => {
        navigate(`/chat/${id}`, { state: state })
    }
    return (
        <>
        <Header />
            <div className='pdf-container'>
                {viewPdf && <>
                    <h6 class="header-txt">Recent uploads</h6>
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
                                        <th scope="col">File name</th>
                                        <th scope="col">status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val.doc_id}</td>
                                                <td>{val.doc_name}</td>
                                                <td>{val.timestamp}</td>
                                                <td>
                                                    <img onClick={() => chatPage(val.doc_id)} src={require('../../assets/icons/chat.png')} className="upload-logo" />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </>}

                {/* if we dont have pdf or viewPdf state is null */}
                {!viewPdf && <>No pdf file selected</>}
            </div>
        </>
    )
}

export default RecentUploads;