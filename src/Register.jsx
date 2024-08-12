import { useNavigate } from "react-router-dom";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useRef } from "react";

const firebaseConfig = {
    apiKey: 'AIzaSyBrF5WQclVgonTWOAlriuM7WSZYRfF3G_c',
    authDomain: 'otpgen-b7a9f.firebaseapp.com',
    projectId: 'otpgen-b7a9f',
  };
  
  firebase.initializeApp(firebaseConfig); 


function Register(){
    const navigate = useNavigate();

  //   const form = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       'service_vuz27ii',
  //        'template_5fl50op', 
  //        form.current, {
  //       publicKey: '3WGdU7N4-bUQs-AFA',
  //     })
  //     .then(
  //       () => {
  //         console.log('SUCCESS!');
  //       },
  //       (error) => {
  //         console.log('FAILED...', error.text);
  //       },
  //     );
  // };
     const [appVerifier, setAppVerifier] = useState('');
    const [state, setState] = useState({
        mobile: '',
        otp: ''
    });
    const valueofchange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }
     const configure=()=>{
        return new Promise((resolve, reject) => {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
              'size': 'invisible',
              'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("verified");
              },
              defaultCountry: "IN"
            });
            window.recaptchaVerifier.render().then(() => {
              resolve(window.recaptchaVerifier);
            });
          });
        
    
    }
    const onSignInSubmit = async (event) => {
      event.preventDefault();
      const phoneNumber = "+91" + state.mobile;
      console.log(phoneNumber);
    
      configure().then((verifier) => {
        const auth = firebase.auth();
        if (!auth) {
          console.error("Firebase Authentication is not initialized");
          return;
        }
        auth.signInWithPhoneNumber(phoneNumber, verifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("otp sent");
            // ...
          }).catch((error) => {
            console.log("sms not sent");
            console.error(error);
            // Error; SMS not sent
            // ...
          });
      });
    }
      const handleVerificationCode = () => {
        
          navigate("/Home");
      }
    return (
    <>
     <h1 id="head">EVisitor-Pass</h1>
     <div className='container-fluid'>
        <form className='login-form' onSubmit={onSignInSubmit}>
         <div class="mb-3">
        <div id="sign-in-button"></div>
  <div class="mb-3">
  <h1 id="login">Register here</h1>

    <label for="exampleInputPassword1" class="form-label"> your phone no.</label>
    <input type="number" class="form-control" id="exampleInputPassword1"  name='number' value={state.number} onChange={valueofchange} />
    <button type="submit" id="loginbtn" class="btn btn-primary" >send otp</button>
  </div>
   <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter your password</label>
    <input type="number" class="form-control" id="exampleInputPassword1" />
  </div>
  <button type="submit" id="loginbtn" class="btn btn-primary"  onClick={ handleVerificationCode}>Sign In</button>
  </div>
  </form>
  </div>
    </>
    );
}
export default Register;