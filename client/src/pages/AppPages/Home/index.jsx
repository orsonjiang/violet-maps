import { useDispatch } from 'react-redux';

import { setModal } from '../../../actions/modal';
import { ModalTypes } from '../../../constants';

import TitleBar from '../components/TitleBar';
import SortBy from '../components/SortBy';
import Maps from '../components/Maps';

const Home = () => {
    const dispatch = useDispatch();

    const handleCreateMap = () => {
        dispatch(setModal(ModalTypes.UPLOAD_MAP));
    };

    return (
        <div>
            <TitleBar title={'Your Maps'}>
                <button
                    className="h-fit py-2.5 px-4 rounded-lg text-white text-sm bg-indigo-400 hover:bg-indigo-500"
                    onClick={handleCreateMap}
                >
                    Create Map
                </button>
                <SortBy />
            </TitleBar>
            <Maps />
        </div>
    );
};

export default Home;
