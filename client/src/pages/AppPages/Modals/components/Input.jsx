const Input = ({ title, children }) => {
    return (
        <div>
            <div className="text-sm whitespace-nowrap flex justify-between gap-3 items-center">
                {title}
                {children}
            </div>
        </div>
    );
};

export default Input;
