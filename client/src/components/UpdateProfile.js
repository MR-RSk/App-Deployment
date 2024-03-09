import React, { useEffect } from 'react'
import TopNavigation from './TopNavigation';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile(){

let firstNameInputRef = useRef();
let lastNameInputRef = useRef();
let emailInputRef = useRef();
let passwordInputRef = useRef();
let mobileNumberInputRef = useRef();
let profilePicInputRef = useRef();
let [profilePicPath,setprofilePicPath] = useState("./images/No-image.webp");

let storeObj = useSelector((store)=>{
  return store;
});

useEffect(()=>{
  firstNameInputRef.current.value = storeObj.userDetails.firstName;
  lastNameInputRef.current.value = storeObj.userDetails.lastName;
  emailInputRef.current.value = storeObj.userDetails.email;
  passwordInputRef.current.value = storeObj.userDetails.password;
  mobileNumberInputRef.current.value = storeObj.userDetails.mobileNumber;
  setprofilePicPath(`http://localhost:7777/${storeObj.userDetails.profilePic}`)
},[]);


let sendUpdatedFormDataToServerThruFD = async ()=>{
  let dataToSend = new FormData();
  dataToSend.append("firstName",firstNameInputRef.current.value);
  dataToSend.append("lastName",lastNameInputRef.current.value);
  dataToSend.append("email",emailInputRef.current.value);
  dataToSend.append("password",passwordInputRef.current.value);
  dataToSend.append("mobileNumber",mobileNumberInputRef.current.value);

  for(let i = 0; i < profilePicInputRef.current.files.length;i++){

    dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
  };

  let reqOptions={
    method:"PUT",
    body:dataToSend,
    
};

let JSONData = await fetch("http://localhost:7777/updateprofile",reqOptions);

let JSOData = await JSONData.json();

if(JSOData.status == "success"){
  alert(JSOData.msg);
}else{
  alert(JSOData.msg);
}

console.log(JSOData);
};



return (
<div className='App'>
<TopNavigation/>
    <form>
    <h1>Profile Update</h1>
    <br></br>
    <div>
      <label>First Name</label>
      <input ref={firstNameInputRef} ></input>
    </div>
    <div>
      <label>Last Name</label>
      <input ref={lastNameInputRef} ></input>
    </div>
    <div>
      <label>Email</label>
      <input ref={emailInputRef} readOnly></input>
    </div>
    <div>
      <label>Password</label>
      <input ref={passwordInputRef} ></input>
    </div>
    <div>
      <label>Mobile Number</label>
      <input ref={mobileNumberInputRef}></input>
    </div>


    <div>
      <label>Profile Pic</label>
      <input ref={profilePicInputRef}  type='file' onChange={(eventObj)=>{
        let selectedImagePath = URL.createObjectURL(eventObj.target.files[0]);
         setprofilePicPath(selectedImagePath);
      }} ></input>
    </div>


    <div>
        <img className='profilepic' src={profilePicPath}  ></img>
    </div>


    <div>
    <button type='button' onClick={()=>{
                sendUpdatedFormDataToServerThruFD();
            }}>Update</button>
    </div>
      
    </form>
    <div>
      <Link to="/">Login</Link>
    </div>
</div>
)
};

export default Profile;