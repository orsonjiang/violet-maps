const Button = ({ children, onClick }) => {
    return (
        <button
            type="button"
            className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
