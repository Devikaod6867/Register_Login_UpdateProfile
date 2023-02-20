import {useEffect, useState} from 'react'
import '../Register/Register.scss'
import {
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {onAuthStateChanged } from "firebase/auth"
import {db,auth} from '../../firebase'

const Home = (props) =>{
  
    const [user, setUser] = useState({});
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword] = useState('')
    const fetchUserdata = async()=>{
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                const data = docSnap.data()
                if (docSnap.exists()) {
                  console.log ("data",docSnap.data(),user.uid,data.username,data.email,data.password)
                  setUsername(data.username)
                  setEmail(data.email)
                  setPassword(data.password)
                  } else {
                    console.log("No such document!");
                  }
      }
      fetchUserdata()
    // const handleUpdate =async(e) =>{
    //   e.preventDefault()
    //     try {
    //       const newData ={
    //         username:username,
    //         email:email,
    //         password:password,
    //         confirmpassword:password
    //       }
    //       const docRef = doc(db, "users", user.uid);

    //       await updateDoc(docRef, newData);
    //       const docSnap =  getDoc(docRef);
    //       console.log("docSnap",docSnap)
    //       console.log("Document updated successfully!");
    //     } catch (error) {
    //       console.log("Error updating document:", error);
    //     }
    //   }

  useEffect(()=>{
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user)
        console.log("User is signed in home");
        console.log("userId home",user.uid,user.email,user.password,user.username)
      } else {
        // User is not signed in
        setUser(null)
        console.log("User is not signed in");
      }
      return unsubscribe;
    });
   
  },[]);
  return(
        <div className='register'>     
        <form action='updateProfile'>
         <h2>Home</h2>
         <form>
         <div className="formInput">
            <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        </div>
        <div className="formInput">
           <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        </div>
        <div className="formInput">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
         value={password}
         onChange={(e) => {setPassword(e.target.value)}}
       
        />
        </div>
     </form>
           <button 
           type='submit' 
          //onClick={handleUpdate}
           >Edit Your Data</button>            
        </form> 
    </div>
    
    )
}
export default {Home,fetchUserdata};