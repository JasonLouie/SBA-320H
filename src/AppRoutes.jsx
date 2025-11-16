import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import TopManga from './pages/TopManga';
import MangaSearch from './pages/MangaSearch';
import MangaInfo from './pages/MangaInfo';
import MangaFavorites from './pages/MangaFavorites';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

export default function AppRoutes() {
    const {state} = useAuth()
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="manga">
                <Route index element={<TopManga />} />
                <Route path="search" element={<MangaSearch />} />
                <Route path=":id" element={<MangaInfo />} />
            </Route>
            {!state ?
                <>
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                </>
                :
                <>
                    <Route path="profile" element={<Profile />} />
                    <Route path="favorites" element={<MangaFavorites />} />
                </>
            }
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
}