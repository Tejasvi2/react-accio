import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import './login.css'

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
    <div className='form-container'>
        <form  onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
            <label>Email address</label>
            <input
                type="email"
                className="form-control"
                name="uname"
                placeholder="Enter email"
             required />
             {renderErrorMessage("uname")}
            </div>
            <div className="mb-3">
            <label>Password</label>
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
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
            {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
            </p> */}
        </form>
    </div>
    </>
 )
}


export default Login;