
import { Routes, Route,BrowserRouter } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/Registerpage';
import MoviePage from './pages/moviepage/MoviePage';
import ProfilePage from './pages/profilepage/AccountPage';
import EditProfilePage from './pages/editprofilepage/EditProfilePage';
import SearchPage from './pages/searchpage/SearchPage';
import CategoriesPage from './pages/categoriespage/CategoriesPage';

function App() {
   return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="/profile"element={<ProfilePage/>}/>
      <Route path="/edit_profile"element={<EditProfilePage/>}/>
      <Route path="/search"element={<SearchPage/>}/>
      <Route path="/categories"element={<CategoriesPage/>}/>
    </Routes>
  );
}

export default App
