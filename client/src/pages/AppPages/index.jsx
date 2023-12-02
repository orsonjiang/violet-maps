import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import apis from '../../api/api';
import auths from '../../api/auth';
import { setUser } from '../../actions/user';
import { setMaps } from '../../actions/map';
import { ModalTypes } from '../../constants';

import Navbar from './components/Navbar';
import Home from './Home';
import Explore from './Explore';
import Map from './Map';
import Edit from './Edit';
import UploadMap from './components/Modals/UploadMap';

const AppPages = () => {
    const dispatch = useDispatch();

    const { view } = useParams();
    const { searchBy } = useSelector((state) => state.home);
    const { user } = useSelector((state) => state.user);
    const { modal } = useSelector((state) => state.modal);

    useEffect(() => {
        auths.postLogin({ auto: true })
            .then(req => {
                if (req.status === 200) {
                    dispatch(setUser(req.data));
                }
            })
            .catch()

        apis.getMaps(view, "", searchBy, user.username)
            .then((res) => {
                dispatch(setMaps(res.data.list));
            })
            .catch()
    }, []);

    useEffect(() => {
        console.log(view);
        apis.getMaps(view, "", searchBy, user.username)
            .then((res) => {
                console.log(res.data.list);
                dispatch(setMaps(res.data.list));
            })
            .catch()
    }, [view]);

    const renderModal = {
        [ModalTypes.UPLOAD_MAP]: <UploadMap />
    };

    const renderView = {
        'home': <Home />,
        'explore': <Explore />,
        'map': <Map />,
        'edit': <Edit />,
    };

    return (
        <div>
            {renderModal[modal]}
            <Navbar />
            <div className="py-4 px-16">
                {renderView[view]}
            </div>
        </div>
    );
};

export default AppPages;
