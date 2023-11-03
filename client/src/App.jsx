import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SiteWrapper from './pages/components/SiteWrapper';
import Home from './pages/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <SiteWrapper>
                <Routes>
                    <Route path="/*" element={<Home/>} />
                </Routes>
            </SiteWrapper>
        </BrowserRouter>
    );
}

export default App;
