import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import WelcomePage from './Components/WelcomePage/WelcomePage';




function App() {
  return (
    // <div classNameName="App">
    //   <header classNameName="App-header">
    //     <img src={logo} classNameName="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       classNameName="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="fill-window">
      <Navbar/>
      <WelcomePage/>
    </div>
  );
}

export default App;
