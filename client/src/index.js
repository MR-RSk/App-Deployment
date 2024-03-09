import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';

let initialStore = {
  userDetails:{},
  
};

let loginReducer = (latestStore = initialStore,dispatchedObj)=>{
  console.log("inside loginReducer");

  if(dispatchedObj.type=="userDetails"){
  return{...latestStore,userDetails:dispatchedObj.data};
};
  
  console.log(latestStore);
  return latestStore;
};

let tasksReducer = (latestStore = initialStore,dispatchedObj)=>{

  console.log("inside tasksReducer");

  if(dispatchedObj.type=="addTask"){
   return{...latestStore,userDetails:dispatchedObj.data};
  }else if(dispatchedObj.type == "addTask"){
   return{...latestStore,userDetails:dispatchedObj.data};
  }else if(dispatchedObj.type == "submitTask"){
    return{...latestStore,userDetails:dispatchedObj.data};
  }else if(dispatchedObj.type == "deleteTask"){
    return{...latestStore,userDetails:dispatchedObj.data};
  };
  return latestStore;
};

let requestReducer = (latestStore = initialStore,dispatchedObj)=>{

  console.log("inside requestReducer");

  if(dispatchedObj.type=="addTask"){
    return{...latestStore,userDetails:dispatchedObj.data};
   }else if(dispatchedObj.type == "raiseRequest"){
    return{...latestStore,userDetails:dispatchedObj.data};
   }else if(dispatchedObj.type == "closeRequest"){
     return{...latestStore,userDetails:dispatchedObj.data};
   };
  console.log(latestStore);
  return latestStore;
};

let leaveReducer = (latestStore = initialStore,dispatchedObj)=>{

  console.log("inside leaveReducer");

  if(dispatchedObj.type=="addTask"){
    return{...latestStore,userDetails:dispatchedObj.data};
   }else if(dispatchedObj.type == "applyLeave"){
    return{...latestStore,userDetails:dispatchedObj.data};
   }else if(dispatchedObj.type == "extendLeave"){
     return{...latestStore,userDetails:dispatchedObj.data};
   }else if(dispatchedObj.type == "cancelLeave"){
     return{...latestStore,userDetails:dispatchedObj.data};
   };
  console.log(latestStore);
  return latestStore;
};

let store = createStore(combineReducers({loginReducer,tasksReducer,requestReducer,leaveReducer}),applyMiddleware(thunk));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
