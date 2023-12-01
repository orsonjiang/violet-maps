import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import auths from '../../api/auth';
import { setUser } from '../../actions/user';

import Navbar from './Navbar';
import Home from '../AppPages/Home';
import Map from '../AppPages/Map';
import Edit from '../AppPages/Edit';

const AppWrapper = () => {
    const dispatch = useDispatch();

    let { view } = useParams();

    useEffect(() => {
        auths.postLogin({ auto: true })
            .then(req => {
                if (req.status === 200) {
                    dispatch(setUser(req.data));
                }
            })
            .catch()
        
    }, []);

    const renderView = () => {
        switch (view) {
            case 'home':
                return <Home />;
            
            case 'explore':
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
