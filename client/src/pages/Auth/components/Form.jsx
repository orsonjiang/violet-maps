const Form = (props) => {
	const { title, children, onSubmit } = props;

    return (
        <div className="flex flex-col min-h-screen bg-violet-200 justify-center">
            <div className="flex flex-col gap-7 items-center justify-between px-8 pt-10 pb-8 mx-auto w-full bg-white rounded-lg shadow-xl max-w-md text-md">
                <div className="flex flex-col gap-4">
                    <div className="text-2xl text-center text-indigo-500 font-bold font-italic">
                        Violet Maps
                    </div>
                    <div className="text-center font-semibold text-gray-900">
						{title}
                    </div>
                </div>
                <form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
					{children}
                </form>
            </div>
        </div>
    );
};

export default Form;
