import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/UpdateProfile';
import Requests from './components/Requests';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import Logout from './components/Logout';
import DeleteProfile from './components/DeleteProfile';



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/requests" element={<Requests/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/leaves" element={<Leaves/>}></Route>
      <Route path="/deleteprofile" element={<DeleteProfile/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
