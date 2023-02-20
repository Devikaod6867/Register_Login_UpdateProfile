import react, { useState } from 'react'
import './Register.scss'
import FormInput from '../../Components/formInput/FormInput'
import { Link ,useNavigate} from 'react-router-dom';
import { auth, provider } from "../../firebase";
import {  
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
  } from "firebase/auth";
  import {db} from '../../firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,setDoc
}from 'firebase/firestore'
const Register = () =>{
    const navigate = useNavigate();
    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmPassword] = useState();
    const [isVerified,setIsVerified] = useState(false)
    const usersCollectionRef = collection(db,"userscollection");
    // const [inputValues,setInputValues] = useState({
    //     username:"",
    //     email:"",
    //     password:"",
    //     confirmPassword:""
    // });
    // const inputs = [
    //     {
    //         id: 1,
    //         name: "username",
    //         type: "text",
    //         placeholder: "Username",
    //         errorMessage:
    //           "Username should be 3-16 characters and shouldn't include any special character",
    //         pattern: "^[A-Za-z0-9]{3,16}$",
    //         required: true,
    //       },
    //       {
    //         id: 2,
    //         name: "email",
    //         type: "email",
    //         placeholder: "Email",
    //         errorMessage: "It should be a valid email address",
    //         required: true,
    //       },
    //       {
    //         id: 3,
    //         name: "password",
    //         type: "text",
    //         placeholder: "Password",
    //         errorMessage:
    //           "Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character",
    //         pattern: `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}$`,
    //         required: true,
    //       },
    //       {
    //         id: 4,
    //         name: "confirmPassword",
    //         type: "text",
    //         placeholder: "Confirm Password",
    //         errorMessage: "Passwords don't match",
    //         pattern: inputValues.password,
    //         required: true,
    //       },
    // ]
    // const handleChange = (e)=>{
    //     setInputValues({...inputValues,[e.target.name]:e.target.value})
    // }
    // const handleRegister = async(e)=>{
    //     e.preventDefault();
    
    //     // try{
    //     //     createUserWithEmailAndPassword(auth,email, password)
    //     //     .then((userCredential) => {
    //     //     // Signed in 
    //     //     const user = userCredential.user;
    //     //     navigate("/login");
    //     //     // ...
    //     //      })

    //     // }catch(error){

    //     // }
    // }
    
    //console.log(inputValues)
    const emailVerification = (e)=>{
      e.preventDefault()
      createUserWithEmailAndPassword(auth,email, password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerification(auth.currentUser)
                console.log("code sent")
                alert("check Your Mail")
                setEmail("")
                setPassword("")
                navigate("/register");
        })
    }
    const handleRegister = async(e)=>{
      e.preventDefault();
      // try {
      //   // const res = await createUserWithEmailAndPassword(auth, email, password);
      //   //  const user = res.user;
      //  // console.log("verification",auth.emailVerified)
       
      //   if(auth.currentUser.emailVerified)
      //   {
      //     await addDoc(collection(db, "users"), {
      //       username :username,
      //       email : email,
      //       password:password,
      //       confirmpassword:confirmpassword
      //     })
      //     alert("register Successufully") 
      //     navigate("/login")
      //   }
      //   else{
      //     alert("email is not Verified")
      //     console.log("email is not Verified")
      //     navigate("/register")
      //   }
         
      // } catch (err) {
      //   console.error(err);
      //   alert("email is not Verified")
      //   //alert(err.message);
      // }
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log('User created: ', user.uid);
  
      // Save the user's data to Firestore
     // const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userData = {
       username:username,
        email: email,
        password:password,
        confirmpassword:password,
        uid:user.uid
      };
      setDoc(userRef, userData).then(() => {
        console.log('User data saved');
        navigate("/login")
      }).catch((error) => {
        console.log('Error saving user data:', error);
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Registration error:', errorMessage);
    });
  
  
  
  
  
      // createUserWithEmailAndPassword(auth,email, password)
      //           .then((userCredential) => {
      //           // Signed in 
      //           const user = userCredential.user;
      //           alert("Registered Successfully>>>>>")
      //           navigate("/login");
              
      //       }).then(
            // await addDoc(usersCollectionRef,
            //   {  
            //     username :username,
            //     email : email,
            //     password:password,
            //     confirmpassword:confirmpassword
            //   })
            //   navigate("/login")
            //   alert("register Successufully")
         // )
      // await addDoc(collection(db,"userscollection"),{
      //        username :username,
      //        email : email,
      //        password:password,
      //        confirmpassword:confirmpassword
      //  })
         
     }
    //  setTimeout(() => {
    //   window.location.reload(true);
    // }, 3000);
    return(
        <div className='register'>
          <form >
             <h2>Register</h2>
                <form>
                    <div className="formInput">
                      <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      onChange={(e) => {setEmail(e.target.value)}}
                      required
                    />
                    </div>
                    <div className="formInput">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={(e) => {setPassword(e.target.value)}}
                      required
                    />
                    <button type='submit' onClick={emailVerification}>Send Email Verification</button>
                    </div>
                </form>
                <form >
                <div className="formInput">
                <input
                  // className='FormInput'
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e)=>{setUsername(e.target.value)}}
                  //required
                />
                </div>
                <div className="formInput">
                  <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => {setEmail(e.target.value)}}
                  required
                />
                </div>
                <div className="formInput">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  required
                />
              
                </div>
                <div className="formInput">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => {setConfirmPassword(e.target.value)}}
                  zrequired
                />
                </div>
                </form>
               <button type='submit' onClick={handleRegister}>Register</button>
               <span>Already Have Account?</span>
               <Link 
               to="/login" 
               className='formSignup' 
               style={{textDecoration:"none"}}
               >
                {" "}
                SignIn</Link>
            </form>
        </div>
    )
}
export default Register;