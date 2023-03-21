import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './login.scss'

const Login = () => {
  const navigate = useNavigate();
  // const [posts, setPosts] = useState([]);
  // React states
  const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//             setPosts(data);
//         })
//         .catch((err) => {
//             console.log(err.message);
//         });
// }, []);

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  async function loginUser(credentials) {
    console.log({credentials})
    return fetch('http://18.223.213.190:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    let { uname, pass } = document.forms[0];
    const response  = await loginUser({ "username":uname.value,"password":pass.value });
    if(response.status == 0){
      localStorage.setItem('userName', uname.value);
      localStorage.setItem('token', response.data.token);
      navigate(`/home`)
    } else {
      setErrorMessages({name: "uname", message: response.message });
    }
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

 return (
    <>
    <div className='login-container'>
    <div className='form-container'>
        <form  onSubmit={handleSubmit}>
            <h3 className='welcome-heading'>Welcome</h3>
            <p>Login into your account</p>
            <div className='seprater-container'>
            <hr className='separater left'></hr>
            <span className='hr-txt'>continue with</span>
            <hr className='separater right'></hr>
            </div>
            <div className="mb-3">
            <input
                type="email"
                className="form-control"
                name="uname"
                placeholder="Enter email"
             required />
             {renderErrorMessage("uname")}
            </div>
            <div className="mb-3">
            <input
                type="password"
                className="form-control"
                name="pass"
                placeholder="Enter password"
                required
            />
            {renderErrorMessage("pass")}
            </div>
            <div className="d-grid">
            <button type="submit" className="btn btn-primary login-btn">
                LOGIN
            </button>
            </div>
        </form>
    </div>
    <div className='img-container'>
    <img src={require('../../assets/icons/login-img.jpg')} className="upload-logo" />

    </div>
    </div>
    </>
 )
}


export default Login;