import { useSelector } from "react-redux";

import Modal from "./Modal";

const ConfirmThumbnail = () => {
    const { thumbnail } = useSelector((state) => state.map.present);

    return (
        <Modal
            title={'Add Thumbnail'}
            close={true}
        >
        <div className='text-sm text-center text-green-600'>{thumbnail ? "Success" : "Uploading..."}</div>
        </Modal>
    );
};

export default ConfirmThumbnail;
