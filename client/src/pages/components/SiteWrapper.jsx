const SiteWrapper = ({children}) => {
	return (
		<div className='bg-gradient-to-r from-gray-50 to-gray-50 min-h-screen'>
			{children}
		</div>
	)
}

export default SiteWrapper;