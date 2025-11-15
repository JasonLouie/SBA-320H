import Footer from './components/Footer';
import Header from './components/Header';
import AuthProvider from './context/AuthContext';
import Main from './components/Main';
import AppRoutes from './AppRoutes';
import HeadingProvider from './context/HeadingContext';

export default function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <HeadingProvider>
                    <Main>
                        <AppRoutes />
                    </Main>
                </HeadingProvider>
                {/* <Footer /> */}
            </AuthProvider>
        </>
    );
}
