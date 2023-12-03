const SiteWrapper = ({children}) => {
    return (
        <div className='flex-col bg-gray-50 min-h-screen w-auto'>
            {children}
        </div>
    )
}

export default SiteWrapper;