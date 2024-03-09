import React, { useEffect } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Leaves from './Leaves';
import Home from './Home';
import Requests from './Requests';
import Profile from './UpdateProfile';
import Tasks from './Tasks';
import Logout from './Logout';
import DeleteProfile from './DeleteProfile';
import { useSelector } from 'react-redux';

function TopNavigation() {
    let navigate = useNavigate();
    let storeObj = useSelector((store)=>{
        return store;
    });

   useEffect(()=>{
    if(storeObj&&storeObj.loginReducer.userDetails&&storeObj.loginReducer.userDetails.email){

    }else{
      //navigate("/signup");
    }
   });

    let styleActiveLink = (obj)=>{
       // console.log(obj);
        if(obj.isActive==true){
         return{
            backgroundColor:"crimson",color:"white",TextDecoration:"none"
            }
        }else{
            return{
            backgroundColor:"aquamarine",color:"black",TextDecoration:"none"
        }
        };
    }

    let deleteProfile = async()=>{

      let reqOptions = {
        method:"DELETE",
      };
      
      let url = `http://localhost:7777/deleteprofile?email=${storeObj.userDetails.email}`;
      
      let JSONData = await fetch(url,reqOptions);

      let JSOData = await JSONData.json();

      if(JSOData.status == "success"){
        alert(JSOData.msg);
        navigate("/signup");
      }
    }
  return (
    <nav>
      <NavLink style={(obj)=>{
        return styleActiveLink(obj);
      }} to="/home" element={<Home/>}>Home</NavLink>

      <NavLink style={(obj)=>{
        return styleActiveLink(obj);
      }} to="/tasks" element={<Tasks/>}>Tasks</NavLink>

      <NavLink style={(obj)=>{
        return styleActiveLink(obj);
      }} to="/requests" element={<Requests/>}>Requests</NavLink>

      <NavLink style={(obj)=>{
        return styleActiveLink(obj);
      }} to="/leaves" element={<Leaves/>}>Leaves</NavLink>

      <NavLink  style={(obj)=>{
        return styleActiveLink(obj);
      }} to="/profile" element={<Profile/>}>Profile</NavLink>

      <NavLink style={(obj)=>{
        return styleActiveLink(obj);
      }}
        onClick={()=>{
        deleteProfile();
      }} to="/deleteprofile" element={<DeleteProfile/>}>Delete Profile</NavLink>

      <NavLink style={(obj)=>{
        return styleActiveLink(obj);
      }} onClick={()=>{
        localStorage.clear();
      }} to="/" element={<Logout/>}>Logout</NavLink>
      
    </nav>
  )
}

export default TopNavigation