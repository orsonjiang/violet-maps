const SiteWrapper = ({children}) => {
    return (
        <div className='flex flex-col bg-gray-50 min-h-screen'>
            {children}
        </div>
    )
}

export default SiteWrapper;