import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged,} from "firebase/auth";
import { auth } from "../firebase";
//import PropTypes from "prop-types";

const userAuthContext = createContext();
function UserAuthContextProvider() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
      }}
    >
      {/* {children} */}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

export default UserAuthContextProvider;
