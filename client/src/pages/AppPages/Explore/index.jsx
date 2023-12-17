import Maps from '../components/Maps';
import SortBy from '../components/SortBy';
import TitleBar from '../components/TitleBar';

const Explore = () => {
    return (
        <div className='px-16'>
            <TitleBar title={'All Maps'}>
                <SortBy />
            </TitleBar>
            <Maps />
        </div>
    );
};

export default Explore;
