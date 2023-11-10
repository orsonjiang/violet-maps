import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SiteWrapper from './pages/components/SiteWrapper';
import Splash from './pages/Splash'
import Login from './pages/Login'

function App() {
    return (
        <BrowserRouter>
            <SiteWrapper>
                <Routes>
                    <Route path="/" element={<Splash/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </SiteWrapper>
        </BrowserRouter>
    );
}

export default App;
