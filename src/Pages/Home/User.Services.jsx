import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "userscollection");

class userDataService {
  
  addusers = (newuser) => {
    return addDoc(userCollectionRef, newuser);
  };

  updateuser = (id, updateduser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updateduser);
  };

  deleteuser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };

  getAllusers = () => {
    return getDocs(userCollectionRef);
  };

  getuser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
}

export default new userDataService();
