import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SiteWrapper from './pages/components/SiteWrapper';
import Splash from './pages/Splash'
import Login from './pages/AuthPages/Login'
import Register from './pages/AuthPages/Register'
import RequestReset from './pages/AuthPages/RequestReset'
import Reset from './pages/AuthPages/Reset'
import AppWrapper from './pages/AppPages/components/AppWrapper';

function App() {
    return (
        <BrowserRouter>
            <SiteWrapper>
                <Routes>
                    <Route path="/" element={<Splash/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/requestReset" element={<RequestReset/>} />
                    <Route path="/reset" element={<Reset/>} />
                    <Route path="/app/:view" element={<AppWrapper/>} />
                </Routes>
            </SiteWrapper>
        </BrowserRouter>
    );
}

export default App;
