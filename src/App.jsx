import { useReducer, useState } from 'react';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserContext from './context/UserContext';
import Home from './pages/Home';
import MangaListPage from './pages/MangaListPage';
import MangaSearch from './pages/MangaSearch';
import MangaInfo from './pages/MangaInfo';
import Footer from './components/Footer';
import MangaFavorites from './pages/MangaFavorites';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
import userReducer from './userReducer';
import Profile from './pages/Profile';

export default function App() {

    const [userState, dispatch] = useReducer(userReducer);
    console.log(JSON.stringify(userState));

    return (
        <>
            <Header />
            <main>
                <div className="content">
                    <UserContext.Provider value={{userState, dispatch}}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="manga">
                                <Route index element={<MangaListPage />} />
                                <Route path="search" element={<MangaSearch />} />
                                <Route path=":id" element={<MangaInfo />} />
                            </Route>
                            {!userState || userState.errors ? 
                                <>
                                    <Route path="signup" element={<Signup />}/> 
                                    <Route path="login" element={<Login />}/> 
                                </>
                                :
                                <>
                                    <Route path="profile" element={<Profile />}/>
                                    <Route path="users/:id/favorites" element={<MangaFavorites />} />
                                </>
                            }
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </UserContext.Provider>
                </div>
            </main>
            <Footer />
        </>
    );
}
