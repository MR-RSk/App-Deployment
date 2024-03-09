import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link ,Navigate, useNavigate } from 'react-router-dom';

function Login() {
    let dispatch =useDispatch();
    let navigate = useNavigate();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    useEffect(()=>{
      emailInputRef.current.value = localStorage.getItem("email");
      passwordInputRef.current.value = localStorage.getItem("password");
      validateLoginOnLoad();
   },[]);

   let validateLoginOnLoad = async()=>{
    let dataToSend = new FormData();
   
    dataToSend.append("token",localStorage.getItem("token"));
    
    let reqOptions={
      method:"POST",
      body:dataToSend,
    };

  let JSONData = await fetch("/validatetoken",reqOptions);

  let JSOData = await JSONData.json();

  console.log(JSOData);

  if(JSOData.status == "failure"){
    alert(JSOData.msg)
  }else{
    localStorage.setItem("email",emailInputRef.current.value);
    localStorage.setItem("password",passwordInputRef.current.value);
    dispatch({type:"userDetails",data:JSOData.data});
    navigate("/home");
  };
};

    let sendFormDataToServerThruFD = async ()=>{
        let dataToSend = new FormData();
       
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
       
        let reqOptions={
          method:"POST",
          body:dataToSend,
          
      };
  
      let JSONData = await fetch("/login",reqOptions);
  
      let JSOData = await JSONData.json();
  
      console.log(JSOData);

      if(JSOData.status == "failure"){
        alert(JSOData.msg)
      }else{
        //localStorage.setItem("email",emailInputRef.current.value);
        //localStorage.setItem("password",passwordInputRef.current.value);
        localStorage.setItem("token",JSOData.data.token);
        dispatch({type:"userDetails",data:JSOData.data});
        navigate("/home");
      };
  };

  let sendFormDataToServer = () => {
    return async()=>{
      let dataToSend = new FormData();
       
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",passwordInputRef.current.value);
     
      let reqOptions={
        method:"POST",
        body:dataToSend,
        
    };

    let JSONData = await fetch("/login",reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);

    if(JSOData.status == "failure"){
      alert(JSOData.msg)
    }else{
      //localStorage.setItem("email",emailInputRef.current.value);
      //localStorage.setItem("password",passwordInputRef.current.value);
      localStorage.setItem("token",JSOData.data.token);
      dispatch({type:"userDetails",data:JSOData.data});
      navigate("/home");
    }
  }
};



  return (
    <div className='App'>
        
        <form>
        <h1>Login</h1>
        <br></br>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} ></input>
        </div>
        
        {/* <br></br>
        <h1>or</h1>
        <br></br>
         */}
        {/* <div>
          <label>Mobile Number</label>
          <input ref={mobileNumberInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} ></input>
        </div> */}

        <br></br>

        <div>
        <button type='button' onClick={()=>{
                    //sendFormDataToServerThruFD();
                    dispatch(sendFormDataToServer());
                }}>Login(Form Data)</button>
        </div>
            
        </form>
        <div>
        <Link to="/signup">SignUp</Link>
        </div>
        
    </div>
  );
  }
              
              

export default Login;