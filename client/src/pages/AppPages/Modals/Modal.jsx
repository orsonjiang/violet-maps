import Dialog from './components/Dialog';

const Modal = ({title, description, inputText, handleConfirm}) => {
    const Input = (
        <div className="mt-3 mb-2">
            <input
                type="search"
                className="block p-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                placeholder={inputText}
            />
        </div>
    );

    return (
        <div
            tabIndex={-1}
            className="flex fixed z-[4000] justify-center items-center w-full h-full bg-gray-800/[0.6] inset-0 max-h-full"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-6 space-y-4 my-3">
                            <h3 className="text-lg font-semibold text-black">
                                {title}
                            </h3>
                            <div className="text-[15px] bg-purple-100 rounded-lg py-3 px-5 justify-center">
                                {description}
                                {inputText ? Input : ""}
                            </div>

                            <Dialog confirm={handleConfirm}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
