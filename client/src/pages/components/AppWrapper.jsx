import { useParams } from 'react-router-dom';

import Navbar from './Navbar';
import Home from '../App/Home';
import Map from '../App/Map';
import Edit from '../App/Edit';
import { useEffect } from 'react';
import auths from '../../api/auth';
import store from '../../store';
import { setUser } from '../../actions/user';

const AppWrapper = () => {
    let { view } = useParams();

    useEffect(() => {
        const autoLogin = async () => {
            const req = await auths.postLogin({ auto: true });

            if (req.status === 200) {
                store.dispatch(setUser(req.data));
            }
        };
        try {
            autoLogin();
        } catch (err) {
            console.log(err);
        }
        
    }, []);

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
