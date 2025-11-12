import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import MangaListPage from './pages/MangaListPage';
import MangaSearch from './pages/MangaSearch';
import MangaInfo from './pages/MangaInfo';
import Footer from './components/Footer';
import MangaFavorites from './pages/MangaFavorites';
import Header from './components/Header';

export default function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="manga" element={<MangaListPage />}>
                        <Route path="search" element={<MangaSearch />}/>
                        <Route path=":id" element={<MangaInfo />}/>
                    </Route>
                    <Route path="users/:id/favorites" element={<MangaFavorites />}/>
                </Routes>
            </main>
            <Footer />
        </>
    );
}
