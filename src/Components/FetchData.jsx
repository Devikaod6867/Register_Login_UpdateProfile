// import {useState,useEffect} from 'react'
// import {getDoc,doc} from "firebase/firestore";
// import {db,auth,} from '../firebase'
// import {onAuthStateChanged } from "firebase/auth"

// const fetchUserdata = async()=>{
//     const [user] = useState({});
//     const [username,setUsername] = useState('');
//     const [email,setEmail] = useState('');
//     const [password,setPassword] = useState('');
//     const [confirmpassword] = useState('')
    
//     const userData = async()=>{
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           const data = docSnap.data()
//           if (docSnap.exists()) {
//             console.log ("data",docSnap.data(),user.uid,data.username,data.email,data.password)
//             setUsername(data.username)
//             setEmail(data.email)
//             setPassword(data.password)
//             } else {
//               console.log("No such document!");
//             }
//         }
// }
// export default fetchUserdata;
