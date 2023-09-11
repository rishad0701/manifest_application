import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  HashRouter
} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className='App'>
      <HashRouter>
      <Routes>
      <Route exact path="/" element = {<Home />}/>
      <Route exact path="/login" element = {<Login />}/>
      <Route exact path="/register" element = {<Register/>}/>
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
