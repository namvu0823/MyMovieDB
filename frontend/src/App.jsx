
import { Routes, Route,BrowserRouter } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/Registerpage';
import MoviePage from './pages/moviepage/moviepage';

function App() {
   return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
}

export default App
