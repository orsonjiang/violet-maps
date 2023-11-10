import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SiteWrapper from './pages/components/SiteWrapper';
import SelectedScreen from './pages/Selected/SelectedScreen';
import Splash from './pages/Splash'
import Login from './pages/Login'
import Register from './pages/Register'
import RequestReset from './pages/RequestReset'
import Reset from './pages/Reset'

function App() {
    return (
        <BrowserRouter>
            <SiteWrapper>
                <Routes>
                    <Route path="/selected" element={<SelectedScreen/>} />
                    <Route path="/" element={<Splash/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/requestReset" element={<RequestReset/>} />
                    <Route path="/reset" element={<Reset/>} />
                </Routes>
            </SiteWrapper>
        </BrowserRouter>
    );
}

export default App;
