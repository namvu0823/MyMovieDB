
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/Registerpage';
function App() {
   return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App
