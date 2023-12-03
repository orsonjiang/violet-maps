const TitleBar = ({ title, children }) => {
    return (
        <div className="py-6 flex justify-between items-center">
            <div className="text-2xl font-semibold">{title}</div>
            <div className="flex gap-3 items-center">
                {children}
            </div>
        </div>
    );
};

export default TitleBar;
