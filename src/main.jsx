import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import ConfirmationSuccess from './views/ConfirmationSuccess.jsx';
import Game from './views/Game.jsx';
import Header from './components/Header.jsx';
import {createBrowserRouter, RouterProvider, Outlet, useLocation} from 'react-router-dom';
import App from "./App.jsx";
import ExpiredToken from "./views/ExpiredToken.jsx";
import {SocketProvider} from "./context/SocketContext.jsx";

function Layout() {
    const location = useLocation();

    const hideHeaderRoutes = ['login', 'register', 'confirmation-success', 'expired-token'];

    return (
        <>
            {!hideHeaderRoutes.some(route => location.pathname.includes(route))
                && <Header/>}
            <Outlet/>
        </>
    );
}

if (sessionStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add('dark');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <App/>,
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/register',
                element: <Register/>,
            },
            {
                path: '/confirmation-success',
                element: <ConfirmationSuccess/>,
            },
            {
                path: '/expired-token',
                element: <ExpiredToken/>,
            },
            {
                path: '/game/:gameId',
                element: <Game/>,
            },
            {
                path: '/confirm/:token',
                element: <ConfirmationSuccess />,
            }
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SocketProvider>
            <RouterProvider router={router}/>
        </SocketProvider>
    </StrictMode>
);