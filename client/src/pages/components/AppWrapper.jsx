import { useParams } from 'react-router-dom';

import Navbar from './Navbar';
import Home from '../App/Home';
import Map from '../App/Map';
import Edit from '../App/Edit';

const AppWrapper = () => {
    let { view } = useParams();

    const renderView = () => {
        switch (view) {
            case 'home':
                return <Home />;

            case 'map':
                return <Map />;

            case 'editmap':
                return <Edit />;

            default:
                return <div></div>;
        }
    };

    return (
        <div>
            <Navbar />
            {renderView()}
        </div>
    );
};

export default AppWrapper;
