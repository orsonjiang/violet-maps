const Button = ({icon, text, handler}) => {
    return(
        <button className='flex items-center rounded-full bg-accent py-1.5 px-4 shadow-lg text-white' onClick={handler}>
                <i className={`${icon} pr-2`}></i>
                <div>{text}</div>
        </button>
    )
}

export default Button;