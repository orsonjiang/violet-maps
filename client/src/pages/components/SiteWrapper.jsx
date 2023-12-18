const SiteWrapper = ({children}) => {
    return (
        <div className='flex flex-col bg-gray-50 h-screen'>
            {children}
        </div>
    )
}

export default SiteWrapper;