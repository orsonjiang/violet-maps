import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SiteWrapper from './pages/components/SiteWrapper';
import Home from './pages/Home/Home';
import SelectedScreen from './pages/Selected/SelectedScreen';

function App() {
    return (
        <BrowserRouter>
            <SiteWrapper>
                <Routes>
                    <Route path="/*" element={<Home/>} />
                    <Route path="/selected" element={<SelectedScreen/>} />
                </Routes>
            </SiteWrapper>
        </BrowserRouter>
    );
}

export default App;
