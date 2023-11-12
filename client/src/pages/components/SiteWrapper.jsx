const SiteWrapper = ({children}) => {
	return (
		<div className='flex-col bg-gray-50 min-h-screen w-auto'>
			{/* <div className='bg-gradient-to-r from-gray-50 to-gray-50 min-h-screen'></div> */}
			{children}
		</div>
	)
}

export default SiteWrapper;