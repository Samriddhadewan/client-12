import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
   // user login
  const HandleUserLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const handleUpdateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // handle login user with google
  const handleGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // handle user log out
  const handleUserLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // check id the user is logged in or not
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("UserLogin -->", currentUser);
      } else {
        setUser(null);
        console.log("UserLogout -->", currentUser);
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [auth]);

  const authInfo = {
    createUser,
    loading,
    user,
    handleUpdateUser,
    handleGoogleLogin,
    handleUserLogout,
    HandleUserLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
