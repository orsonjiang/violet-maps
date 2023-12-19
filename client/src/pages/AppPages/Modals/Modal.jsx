import Dialog from './components/Dialog';
import Close from './components/Close';

const Modal = ({ title, fields, children, maxWidthSize, confirm, close }) => {
    const maxWidth = maxWidthSize ? maxWidthSize : 'max-w-md';

    return (
        <div
            tabIndex={-1}
            className="flex fixed z-[4000] justify-center items-center w-full h-full bg-gray-800/[0.6] inset-0 max-h-full"
        >
            <div className={`relative w-full max-h-full ${maxWidth}`}>
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-6 space-y-4 my-3">
                            <h3 className="text-lg font-semibold text-black">
                                {title}
                            </h3>
                            <div className={fields ? "flex flex-col gap-3 text-[15px] bg-purple-100 rounded-lg p-5 justify-center" : ""}>
                                {children}
                            </div>
                            {close ? <Close />: <Dialog confirm={confirm} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
