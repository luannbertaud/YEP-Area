import { Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profil from './pages/Profil'
import Apk from './pages/Apk'

function App() {
  return (
    <div className="App" style={{ height: '100vh' }} >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/dlapk" element={<Apk />} />
      </Routes>
    </div>
  );
}

export default App;