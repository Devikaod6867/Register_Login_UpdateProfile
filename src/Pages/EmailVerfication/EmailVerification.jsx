import react, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { sendEmailVerification,signInWithEmailAndPassword,isSignInWithEmailLink, signInWithEmailLink ,signInAnonymously} from "firebase/auth";
import { auth } from "../../firebase";

const EmailVerification = () =>{
    const [email,setEmail] = useState();
    const [password , setpassword] = useState('');
    const navigate = useNavigate();

    const handleVerification = () =>{
        //e.preaventDefault();
        signInAnonymously(auth)
        //signInWithEmailAndPassword(auth,email,password)
        alert("Signed in>>>>>>>>")
        sendEmailVerification(auth.currentUser)
       // console.log("Signed in>>>>>>>>")
        .then(() => {
          // Signed in..
          
          // Signed in..
          alert("Signed in>>>>>>>>send verification mail")
        })
        console.log("user",auth)
        // .then(() => {
        //     // Signed in..
        //     sendEmailVerification(auth.currentUser)
        //     .then(() => {
        //         console.log("Email verification sent!")
        //         //navigate("/register")
        //         // Email verification sent!
        //         // ...
        //     });
        //})
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
      
    }
    return(
        <div className="login">
        <form>
          <h2>Email Verification</h2>
          <div className="formInput">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
             // onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          {/* </div>
          <div className="formInput">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e)=>{setpassword(e.target.value)}}
              required
            /> */}
          </div>
    
          <button type="submit"
           onClick={handleVerification}
           >
            Send Email Verification Code 
          </button>
         </form>
        </div>
    )
}
export default EmailVerification;