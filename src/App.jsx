import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import MangaListPage from './pages/MangaListPage';
import MangaSearch from './pages/MangaSearch';
import MangaInfo from './pages/MangaInfo';
import Footer from './components/Footer';
import MangaFavorites from './pages/MangaFavorites';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';

export default function App() {
    return (
        <>
            <Header />
            <main>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="manga">
                            <Route index element={<MangaListPage />}/>
                            <Route path="search" element={<MangaSearch />} />
                            <Route path=":id" element={<MangaInfo />} />
                        </Route>
                        <Route path="users/:id/favorites" element={<MangaFavorites />} />
                        <Route path="*" element={<NoMatch />}/>
                    </Routes>
                </div>
            </main>
            <Footer />
        </>
    );
}
