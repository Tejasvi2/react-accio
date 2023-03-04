import { ChatWindow } from '../chat-window/chat-window.component';
import React, { useState, useEffect } from 'react';
import './recent-uploads.scss';
import { useNavigate } from "react-router-dom";




const RecentUploads = () => {
    const navigate = useNavigate();
    const [viewPdf, setViewPdf] = useState('data');
    const [posts, setPosts] = useState([]);


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


    const chatPage = (id) => {
        navigate(`/chat/${id}`, { state: viewPdf })
    }
    return (
        <>
            
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
                                                <td>{val.id}</td>
                                                <td>{val.title}</td>
                                                <td>{new Date().getDate()}</td>
                                                <td>
                                                    <img onClick={() => chatPage(val.id)} src={require('../../assets/icons/chat.png')} className="upload-logo" />
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