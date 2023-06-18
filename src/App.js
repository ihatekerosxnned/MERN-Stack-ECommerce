import "./App.css";
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Display from "./components/Display/Display";
import DisplayProducts from "./components/DisplayProducts/DisplayProdcuts";
import DisplayDetails from "./components/DisplayDetails/DisplayDetails";
import Add from "./components/Add/Add";
import Search from "./components/Search/Search";
import DisplayShirts from "./components/DisplayShirts/DisplayShirts";
import DisplayShorts from "./components/DisplayShorts/DisplayShorts";
import UserAdd from "./components/UserAdd/UserAdd";
import UserDisplay from "./components/UserDisplay/UserDisplay";


function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Home/>} />}
      <Route path="/signup" exact element={<Signup/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/display" exact element={<Display/>} />
      <Route path="/displayproducts" exact element={<DisplayProducts/>} />
      <Route path="/displayshirts" exact element={<DisplayShirts/>} />
      <Route path="/displayshorts" exact element={<DisplayShorts/>} />
      <Route path="/displaydetails/:productId" exact element={<DisplayDetails/>} />
      <Route path="/userdisplay" exact element={<UserDisplay/>} />
      <Route path="/useradd" exact element={<UserAdd/>} />
      <Route path="/add" exact element={<Add/>} />
      <Route path="/search" exact element={<Search/>} />
      <Route path="/" exact element={<Navigate replace to="/login"/>} />
    </Routes>
  );
}

export default App;
