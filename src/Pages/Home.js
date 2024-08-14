import React ,{useContext} from "react";
import {useNavigate} from 'react-router-dom';
import './Home.css'
function Home(){
    const history = useNavigate();
    const handleClick = () => {
        history('/firsttool');
      };
    return(
        <div className="container">
      <div className="background"></div>
      <div className="content">
        <img width='200' height='200' src={require('./logo.png')}/>

        <p>Empower your football club with our state-of-the-art tool designed to revolutionize the transfer market game. Say hello to data-driven precision! Our sophisticated Machine learning approach predicts player performance, ensuring your club makes wise decisions while staying within budget constraints. Maximize success in the transfer window and minimize spending with our game-changing solution.</p>
        <button onClick={handleClick}>Go to Tool</button>
      </div>
    </div>
    )
}

export default Home;