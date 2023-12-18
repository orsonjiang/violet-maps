const TextField = ({placeholder, onChange, value}) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            className="rounded-lg p-1.5 px-3 bg-white w-full"
            value={value}
        />
    );
};

export default TextField;
