 import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login_user_email.css";
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';

 function Login_user_email(){
  //domain
   // clientid
  // const { loginWithRedirect } = useAuth0();
  const [isVerified, setIsVerified] = useState(false);
  const onChange=(value)=>{
    // event.preventDefault();
    if (value) {
      setIsVerified(true);

    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (isVerified) {
      navigate("/Home");
    } else {
      alert("Please complete the reCAPTCHA");
    }
  };
    
    const navigate = useNavigate();
    const gotoLogin=()=>{
      navigate("/Register");
    }
      return <div>
       
        <h1 id="head">EVisitor-Pass</h1>
    <body>
        
        <div className='container-fluid'>
        <form className='login-form' >
  <div class="mb-3">
  <h1 id="login">Login here</h1>
    <label for="exampleInputEmail1" class="form-label">USER ID</label>
     <input type="email" class="form-control" id="exampleInputEmail1"required="true" name='username' aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">Forget Password?</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">PASSWORD</label>
    <input type="password" class="form-control" required="true" id="exampleInputPassword1"  name='username'/>
   
  </div> 
  <ReCAPTCHA
    sitekey="6LfdOAQqAAAAAMJnxfLOoTwhylj7GOjMAwKDlf52"
    onChange={onChange}
  />
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
  </div>
  <button type="submit" id="loginbtn" class="btn btn-primary" onClick={handleLogin}>Login</button>
  <br></br>
  <p id="register">To Register New Account</p>
  <button type="submit"  id="loginbtn"class="btn btn-primary" onClick={gotoLogin} >Click Me</button>
</form>      
  </div>
        
     
    </body>

    </div>
     
}
export default Login_user_email;