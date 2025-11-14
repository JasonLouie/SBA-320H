import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MangaListPage from './pages/MangaListPage';
import MangaSearch from './pages/MangaSearch';
import MangaInfo from './pages/MangaInfo';
import Footer from './components/Footer';
import MangaFavorites from './pages/MangaFavorites';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import AuthProvider, { useAuth } from './context/AuthContext';
import Main from './components/Main';

export default function App() {
    return (
        <>
            <Header />
            <Main>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="manga">
                            <Route index element={<MangaListPage />} />
                            <Route path="search" element={<MangaSearch />} />
                            <Route path=":id" element={<MangaInfo />} />
                        </Route>
                        {!useAuth() ?
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
                </AuthProvider>
            </Main>
            <Footer />
        </>
    );
}
