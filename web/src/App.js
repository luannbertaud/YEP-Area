import {Route, Routes} from "react-router-dom";
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'

function App() {
  return (
    <div className="App" style={{ height: '100vh' }} >
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profil" element={<Profil/>}/>
      </Routes>
    </div>
  );
}

export default App;