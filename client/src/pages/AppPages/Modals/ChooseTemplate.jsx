import { useDispatch } from 'react-redux';

import { setModal } from '../../../actions/modal';
import { ModalTypes, TemplateTypes } from '../../../constants';

import Modal from './Modal';
import Template from './components/Template';

const ChooseTemplate = () => {
    const dispatch = useDispatch();

    const handleConfirm = () => {
        dispatch(setModal(ModalTypes.SET_DATA));
    };

    return (
        <Modal title={'Choose Template'} confirm={handleConfirm} maxWidthSize={'max-w-5xl'}>
            <div className="grid grid-cols-3 gap-4 px-5">
                <Template type={TemplateTypes.BLANK}>Blank Map</Template>
                <Template type={TemplateTypes.HEAT}>Heat Map</Template>
                <Template type={TemplateTypes.CHOROPLETH}>
                    Choropleth Map
                </Template>
                <Template type={TemplateTypes.STRING}>String Map</Template>
                <Template type={TemplateTypes.NUMERICAL}>
                    Numerical Map
                </Template>
                <Template type={TemplateTypes.BUBBLE}>Bubble Map</Template>
            </div>
        </Modal>
    );
};

export default ChooseTemplate;
