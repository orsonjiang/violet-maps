import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '../../../actions/modal';
import { ModalTypes } from '../../../constants';

import TitleBar from '../components/TitleBar';
import SortBy from '../components/SortBy';
import Maps from '../components/Maps';
import Loading from '../components/Loading';

const Home = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const handleCreateMap = () => {
        dispatch(setModal(ModalTypes.UPLOAD_MAP));
    };

    if (user._id === '') {
        return (<Loading>
            Please register or login to make your own maps.
        </Loading>)
    }

    return (
        <div className='py-4 px-16 grow flex flex-col overscroll-auto'>
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
