const SiteWrapper = ({children}) => {
	return (
		<div className='bg-gradient-to-r from-purple-100 to-indigo-100 min-h-screen'>
			{children}
		</div>
	)
}

export default SiteWrapper;