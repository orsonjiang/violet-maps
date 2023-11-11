import { useParams } from 'react-router-dom';

import Navbar from './Navbar';
import Modal from './Modal';
import Home from '../Home';
import Map from '../Map';
import EditMap from '../EditMap';

const AppWrapper = () => {
    let { view } = useParams();

    const renderView = () => {
        switch (view) {
            case 'home':
                return <Home />;

            case 'map':
                return <Map />;

            case 'editmap':
                return <EditMap />;

            default:
                return <div></div>;
        }
    };

    return (
        <div>
            <Navbar />
			<Modal />
            {renderView()}
        </div>
    );
};

export default AppWrapper;
