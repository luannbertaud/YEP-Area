import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function AppOld() {
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        </div>
    );
}

function Ping() {
    return ("pong");
}

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" exact element={<AppOld/>}/>
                <Route path="/ping" exact element={<Ping/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
