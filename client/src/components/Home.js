import React, { useEffect,useState, useRef } from 'react';
import { Link,Navigate, useFetcher, useNavigate } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function Home() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicPath,setprofilePicPath] = useState("./images/No-image.webp");
  let navigate = useNavigate();
  let storeObj = useSelector((store)=>{
    return store;
  });
  //console.log(storeObj)

  // navigate("/login")

  useEffect(()=>{
    // firstNameInputRef.current.value = storeObj.userDetails.firstName;
    // lastNameInputRef.current.value = storeObj.userDetails.lastName;
    setprofilePicPath(`/${storeObj.loginReducer.userDetails.profilePic}`)
  },[]);

  useEffect(()=>{
    console.log("home load")
  },[profilePicPath]);

  useEffect(()=>{
    console.log("total load")
  });

  useEffect(()=>{
    return()=>{
      console.log("component unload")
    }
  });

  return (
     <div className='App'>
       <TopNavigation/>
        <h1>Home</h1>
        <div>
          <h2>Welcome {storeObj.loginReducer.userDetails.firstName} {storeObj.loginReducer.userDetails.lastName}</h2>
        </div>
        <div>
        <img className='profilepic1' src={`/${storeObj.loginReducer.userDetails.profilePic}`}></img>
        </div>
    </div>
  )
};

export default Home;