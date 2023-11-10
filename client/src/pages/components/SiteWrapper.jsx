const SiteWrapper = ({children}) => {
	return (
		<div className='flex-col bg-[#F3E7FF] min-h-screen w-auto'>
			{children}
		</div>
	)
}

export default SiteWrapper;