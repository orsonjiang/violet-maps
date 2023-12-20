import Maps from '../components/Maps';
import SortBy from '../components/SortBy';
import TitleBar from '../components/TitleBar';

const Explore = () => {
    return (
        <div className='py-4 px-16 grow flex flex-col overscroll-auto'>
            <TitleBar title={'All Maps'}>
                <SortBy />
            </TitleBar>
            <Maps />
        </div>
    );
};

export default Explore;
