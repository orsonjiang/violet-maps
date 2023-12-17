const TextField = ({placeholder, onChange}) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            className="rounded-lg p-1.5 px-3 bg-white w-full"
        />
    );
};

export default TextField;
