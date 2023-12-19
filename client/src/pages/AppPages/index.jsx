import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionCreators } from 'redux-undo';

import apis from '../../api/api';
import { setMaps } from '../../actions/maps';
import { setMap } from '../../actions/map';

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
        if (view == "home" || view == "explore") {
            apis.getMaps(view, searchBy, "")
                .then((res) => {
                    dispatch(setMaps(res.data.maps));
                })
                .catch()
            dispatch(setMap(null));
            dispatch(ActionCreators.clearHistory());
        }
        
    }, [view]);

    const renderView = {
        'home': <Home />,
        'explore': <Explore />,
        'map': <Map />,
        'edit': <Edit />,
    };

    return (
        <>
            <Modals />
            <Navbar />
            {renderView[view]}
        </>
    );
};

export default AppPages;
