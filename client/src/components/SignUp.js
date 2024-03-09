import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNumberInputRef = useRef();
    let profilePicInputRef = useRef();
    let [profilePicPath,setprofilePicPath] = useState("./images/No-image.webp");


    let sendFormDataToServerThruFD = async ()=>{
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
        method:"POST",
        body:dataToSend,
        
    };

    let JSONData = await fetch("/signup",reqOptions);

    let JSOData = await JSONData.json();

    if(JSOData.status == "success"){
      alert(JSOData.msg);
    //  dispatch({type:"userDetails",data:JSOData.data});
    //  navigate("/home");
    }else{
      alert(JSOData.msg); 
       
    }

    console.log(JSOData);
};



  return (
    <div className='App'>
      
        <form>
        <h1>SignUp</h1>
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
          <input ref={emailInputRef}></input>
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
                    sendFormDataToServerThruFD();
                }}>Sign Up(Form Data)</button>
        </div>
          
        </form>
        <div>
          <Link to="/">Login</Link>
        </div>
    </div>
  )
}

export default SignUp;