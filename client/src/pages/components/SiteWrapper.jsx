const SiteWrapper = ({children}) => {
	return (
		<div className='flex-col bg-gray-50 dark:bg-gray-800 min-h-screen w-auto'>
			{children}
		</div>
	)
}

export default SiteWrapper;