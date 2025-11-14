import Footer from './components/Footer';
import Header from './components/Header';
import AuthProvider, { useAuth } from './context/AuthContext';
import Main from './components/Main';
import AppRoutes from './AppRoutes';

export default function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <Main>
                    <AppRoutes />
                </Main>
                <Footer />
            </AuthProvider>
        </>
    );
}
