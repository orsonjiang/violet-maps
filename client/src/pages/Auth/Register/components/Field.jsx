const Field = (props) => {
    const { id, placeholder } = props;

    return (
        <input
            name={id}
            id={id}
            className="bg-gray-50 text-gray-900 shadow-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
            placeholder={placeholder}
        />
    );
};

export default Field;
