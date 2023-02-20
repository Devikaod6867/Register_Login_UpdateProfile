import react,{useEffect, useState} from 'react'
import './Login.scss'
import FormInput from '../../Components/formInput/FormInput'
import { Link, useNavigate } from 'react-router-dom';
import {
    Visibility,
    VisibilityOff,
  } from "@mui/icons-material";
import { auth,db } from "../../firebase";
import {collection,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  doc,
  query,
  where } from "firebase/firestore";
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth"
const Login = () =>{
    const [toggleEye, setToggleEye] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    //const [inputType, setInputType] = useState("password");
    // const [inputs,setInputs] = useState({
    //   password:"",
    //     email:""
    // });
    const navigate = useNavigate();
    // const handleChange = (e) => {
    //     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
   // console.log(inputs)
    // const handleToggle = (e) => {
    //     setToggleEye(!toggleEye);
    //     setInputType(inputType === "password" ? "text" : "password");
    // };
    const handleLogin = async(e) =>{
        e.preventDefault();
        // try{
        //   signInWithEmailAndPassword(auth,email, password)
        //   .then(response=>{
        //     const user_uid = response.user_uid;
        //     collection(db,"users")
        //     .getDoc(user_uid)
        //     .then(function(user){
        //       if(user.exits){
        //         if(auth.currentUser.emailVerified){
        //           var userdetails = {...user.data(), id: user_uid};
        //           console.log("userdetails",userdetails)
        //           navigate("/")
        //         }
        //         else{
        //           alert('email is not verified')
        //           navigate("/register")
        //         }
        //       }
        //       else{
        //         alert("user not found")
        //       }
        //     })
        //   })
          
         
        //   // .then(response => {
        //   //   const user_uid = response.user.uid;
        //   //   db.collection('usersCollection')
        //   //     .doc(user_uid)
        //   //     .get()
        //   //     .then(console.log(user_uid))
        //   //     // .then(function(user){
        //   //     //   if(user.exists){
        //   //     //     var userdetails = {...user.data(), id: user_uid};
        //   //     //   console.log(userdetails);
        //   //     //   }
        //   //     // })
        //   // })
        //   // console.log("email",email,"password",password)
        //   // navigate("/")
        //   // .then((userCredential) => {
        //   //   console.log("Signed in ")   
        //   //   // Signed in 
        //   //   const user = userCredential.user;
        //   //   // ...
        //   //   console.log("user",user)
        //   // })
        //   // .catch((error) => {
        //   //   const errorCode = error.code;
        //   //   const errorMessage = error.message;
        //   // });
        // }catch(error){
        //   console.log(error.message)
        // }
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('User logged in: ', user.uid);
          alert("User logged in")
          console.log("currentUser login",auth.currentUser)
          navigate("/")
          // You can access the user's data in Firestore using their user ID (uid)
          //const db = getFirestore();
          const  userRef = doc(db, 'users', user.uid);
          getDoc(userRef).then((doc) => {
            if (doc.exists()) {
              console.log("current User Data",auth.currentUser)
              console.log('User data:', doc.data());
            } else {
              console.log('No user data found');
            }
          }).catch((error) => {
            console.log('Error getting user data:', error);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Login error:', errorMessage);
        });

    }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in");
      } else {
        // User is not signed in
        console.log("User is not signed in");
      }
      return unsubscribe;
    });

    return(
        <div className="login">
        <form>
          <h2>Login</h2>
          <div className="formInput">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
          <div className="formInput">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e)=>{setPassword(e.target.value)}} // onChange={handleChange}
              required
            />
            {/* <div className="eyeIcon" onClick={handleToggle}>
              {toggleEye ? <Visibility /> : <VisibilityOff />}
            </div> */}
          </div>
          <button type="submit"
            onClick={handleLogin}
           >
            Login
          </button>
  
          <div className="formLink">
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="formSignup"
              style={{ textDecoration: "none" }}
            >
              {" "}
              SignUp
            </Link>
          </div>
         </form>
        </div>
    )
}
export default Login;