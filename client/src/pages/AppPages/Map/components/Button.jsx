const Button = ({ className, icon, text, handler, disabled }) => {
    return(
        <button className='flex items-center rounded-full bg-accent py-1.5 px-4 shadow-lg text-white disabled:opacity-50' onClick={handler} disabled={disabled} >
            <i className={`${icon} pr-2`}></i>
            <div className={className}>{text}</div>
        </button>
    )
}

export default Button;