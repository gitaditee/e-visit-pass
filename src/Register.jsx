import { useNavigate } from "react-router-dom";
import 'firebase/compat/auth';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function Register(){
    const navigate = useNavigate();
    const [password,setPassword]=useState();
    const [userid, setusername] = useState();
    const [PhoneNo, setPhoneNo] = useState();
    const [message, setMessage] = useState('');
    const notifySuccess = () => toast.success("Successfully Registered!");
    const handleLogin = (event) => {
      event.preventDefault();
      axios.post('http://127.0.0.1:5000/register', {
        userid: userid,
        PhoneNo: PhoneNo,
        password: password,
    })
    .then((response) => {
        if (response.data.message === 'User registered successfully') { 
            notifySuccess();
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            setMessage(response.data.message);
        }
    })
    .catch((error) => {
        console.error(error);
    });
      
    }
    const onSignInSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      notifySuccess();
      formData.append("access_key", "28227371-74e8-47b7-8b4a-1deda6e1b1b7");
  
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
  
      if (res.success) {
        console.log("Success", res);
      }
    
    }
    const handleUsernameChange = (event) => {
      setusername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const handlePhoneNoChange = (event) => {
      setPhoneNo(event.target.value);
    };
    return (
    <>
     <h1 id="head">EVisitor-Pass</h1>
     <div className='container-fluid'>
        <form className='login-form'>
         <div class="mb-3" onSubmit={ onSignInSubmit}>
        <div id="sign-in-button"></div>
  <div class="mb-3">
  <h1 id="login">Register here</h1>
  <label for="exampleInputEmail1" class="form-label">Email ID</label>
  <input type="email" class="form-control" id="exampleInputEmail1"required="true" name='username'value={userid} onChange={handleUsernameChange} aria-describedby="emailHelp"/>
    <label for="exampleInputPassword1" class="form-label"> your phone no.</label>
    <input type="number" class="form-control" id="exampleInputPassword1"  name='number' value={PhoneNo} onChange={handlePhoneNoChange }/>
    <br></br>
    {/* <button type="submit" id="loginbtn" class="btn btn-primary" >send otp to your email id</button> */}
  </div>
   <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter your password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={handlePasswordChange} />
  </div>
  <button type="submit" id="loginbtn" class="btn btn-primary"  onClick={ handleLogin} >Sign In</button>
  <ToastContainer />  
  </div>
  </form>
  </div>
    </>
    );
}
export default Register;