import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './login.scss'

const Login = () => {
  const navigate = useNavigate();

  // React states
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1@gmail.com",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    let { uname, pass } = document.forms[0];
    const userData = database.find((user) => user.username == uname.value);
    if(userData){
        if(userData.password != pass.value){
            setErrorMessages({name: "pass", message: errors.pass});   
        } else {
            setIsSubmitted(true);
            navigate(`/home`)
        }
    } else {
        setErrorMessages({name: "uname", message: errors.uname });
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
            {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
            </p> */}
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