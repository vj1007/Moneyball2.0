import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, RouterProvider, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Tool from './Pages/Tool';
import LogIn from './Pages/Login';
import AboutUs from './Pages/About';
import ContactUs from './Pages/Contact';
import PlayerProfile from './Pages/Playerprofie';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Result from './Pages/Result';
import SignUp from './Pages/Signup';
import Chart from './Pages/Chart';
import FirstTool from './Pages/FirstTool';
import ResultChart from './Pages/ResultChart';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path='/' element={<LogIn/>}/>
          <Route path='/tool' element={<Tool/>}/>
          <Route path='/firsttool' element={<FirstTool/>}/>
          <Route path='/chart' element={<Chart/>}/>
          <Route path='/resultchart' element={<ResultChart/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/playerprofile' element={<PlayerProfile/>}/>
          <Route path='/result' element={<Result/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
