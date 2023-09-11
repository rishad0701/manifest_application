import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
      <Route exact path="/" element = {<Home />}/>
      <Route exact path="/login" element = {<Login />}/>
      <Route exact path="/register" element = {<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
