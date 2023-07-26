import { auth , googleProvider} from "../firebase";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import * as firebase from "../firebase";
export const Auth = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    if(auth?.currentUser?.email){
        console.log(auth?.currentUser?.email)
        navigate("/");
    }
    
  const signIn = async () => {
   
    try {
    await createUserWithEmailAndPassword(auth, email, password);
    } catch (err){
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
    await signInWithPopup(auth,googleProvider);
    navigate("/")
    } catch (err){
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
    await signOut(auth);
    } catch (err){
      console.error(err);
    }
  };
  
  return (
    
    <>
    <div className="box">
    <div className="text-center m-5" >
      <div class="col-md-12"> <button class="btn btn-lg btn-google btn-block text-uppercase btn-outline border" onClick={signInWithGoogle}><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</button> </div>
      </div>
      </div>
      </>
    
  );
};

export default Auth