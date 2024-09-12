 import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login_user_email.css";
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 function Login_user_email(){

  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');
  const notifySuccess = () => toast.success("Successfully Login!");
  const onChange=(value)=>{
    // event.preventDefault();
    if (value) {
      setIsVerified(true);
    }
  };

    
    const navigate = useNavigate();
    const gotoLogin=()=>{
      navigate("/Register");
    }
    const [password,setPassword]=useState();
    const [userid, setusername] = useState();
   
    const handleLogin = async (event) => {
      event.preventDefault(); // Prevent form submission
      
      axios.post('http://127.0.0.1:5000/login', {
          userid: userid,
          password: password,
      })
      .then((response) => {
          if (response.data.message === 'Login successful') { 
              notifySuccess(); // Call the success notification
              setTimeout(() => {
                  navigate('/home'); // Redirect to the home page after success
              }, 3000);
          } else {
              setMessage(response.data.message); // Display the error message from the backend
          }
      })
      .catch((error) => {
          console.error('Error during login:', error);
          setMessage('An error occurred during login. Please try again.'); // Display a general error message
      });
  };
  

    
    const handleUsernameChange = (event) => {
      setusername(event.target.value);
      
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
      return <div>
       
        <h1 id="head">EVisitor-Pass</h1>
    <body>
        
        <div className='container-fluid'>
        <form className='login-form' onSubmit={handleLogin} >
  <div class="mb-3">
  <h1 id="login">Login here</h1>
    <label for="exampleInputEmail1" class="form-label">USER ID</label>
     <input type="email" class="form-control" id="exampleInputEmail1"required="true" name='username' value={userid} onChange={ handleUsernameChange}aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">Forget Password?</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">PASSWORD</label>
    <input type="password" class="form-control" required="true" id="exampleInputPassword1" onChange={handlePasswordChange} value={password} name='password'/>
   
  </div> 
  <ReCAPTCHA
    sitekey="6LfdOAQqAAAAAMJnxfLOoTwhylj7GOjMAwKDlf52"
    onChange={onChange}
  />
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
  </div>
  <button type="submit" id="loginbtn" class="btn btn-primary" >Login</button>
 
  <p id="register">To Register New Account</p>
  <button type="submit"  id="loginbtn"class="btn btn-primary" onClick={gotoLogin} >Click Me</button>
  <ToastContainer />
</form>      
  </div>
        
     
    </body>

    </div>
     
}
export default Login_user_email;