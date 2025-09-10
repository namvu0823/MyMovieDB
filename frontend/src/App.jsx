
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/LoginPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import MoviePage from './pages/moviepage/MoviePage';
import ProfilePage from './pages/profilepage/AccountPage';
import EditProfilePage from './pages/editprofilepage/EditProfilePage';
import SearchPage from './pages/searchpage/SearchPage';
import CategoriesPage from './pages/categoriespage/CategoriesPage';


function App() {
   return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/profile"element={<ProfilePage/>}/>
        <Route path="/edit_profile"element={<EditProfilePage/>}/>
        <Route path="/search"element={<SearchPage/>}/>
        <Route path="/categories"element={<CategoriesPage/>}/>
      </Route>

      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App
