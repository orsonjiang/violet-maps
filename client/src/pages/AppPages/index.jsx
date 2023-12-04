import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import apis from '../../api/api';
import auths from '../../api/auth';
import { setUser } from '../../actions/user';
import { setMaps } from '../../actions/map';

import Navbar from './components/Navbar';
import Home from './Home';
import Explore from './Explore';
import Map from './Map';
import Edit from './Edit';
import Modals from './Modals'

const AppPages = () => {
    const dispatch = useDispatch();

    const { view } = useParams();
    const { searchBy } = useSelector((state) => state.collate);

    useEffect(() => {
        auths.postLogin({ auto: true })
            .then(req => {
                if (req.status === 200) {
                    dispatch(setUser(req.data));
                }
            })
            .catch()

        apis.getMaps(view, searchBy, "")
            .then((res) => {
                dispatch(setMaps(res.data.maps));
            })
            .catch()
    }, []);

    const renderView = {
        'home': <Home />,
        'explore': <Explore />,
        'map': <Map />,
        'edit': <Edit />,
    };

    return (
        <div>
            <Modals />
            <Navbar />
            <div className="py-4 px-16">
                {renderView[view]}
            </div>
        </div>
    );
};

export default AppPages;
