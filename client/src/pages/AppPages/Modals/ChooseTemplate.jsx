import { useDispatch } from 'react-redux';

import { setModal } from '../../../actions/modal';
import { ModalTypes, TemplateTypes } from '../../../constants';

import Modal from './Modal';
import Template from './components/Template';

import blankMap from './images/blankMap.png';
import heatMap from './images/heatMap.png';
import choroplethMap from './images/choroplethMap.png';
import numericalMap from './images/numericalMap.png';
import stringMap from './images/stringMap.png';
import bubbleMap from './images/bubbleMap.png';

const ChooseTemplate = () => {
    const dispatch = useDispatch();

    const handleConfirm = () => {
        dispatch(setModal(ModalTypes.SET_DATA));
    };

    return (
        <Modal title={'Choose Template'} confirm={handleConfirm} maxWidthSize={'max-w-5xl'}>
            <div className="grid grid-cols-3 gap-4">
                <Template type={TemplateTypes.BLANK} image={blankMap}>Blank Map</Template>
                <Template type={TemplateTypes.HEAT} image={heatMap}>Heat Map</Template>
                <Template type={TemplateTypes.CHOROPLETH} image={choroplethMap}>
                    Choropleth Map
                </Template>
                <Template type={TemplateTypes.STRING} image={stringMap}>String Map</Template>
                <Template type={TemplateTypes.NUMERICAL} image={numericalMap}>
                    Numerical Map
                </Template>
                <Template type={TemplateTypes.BUBBLE} image={bubbleMap}>Bubble Map</Template>
            </div>
        </Modal>
    );
};

export default ChooseTemplate;
