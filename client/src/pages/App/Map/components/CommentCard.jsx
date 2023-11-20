const CommentCard = ({initials, name, comment}) => {
    return(
        <div className="flex my-1 space-x-4">
            <button className="self-center font-semibold bg-indigo-300 text-xs h-10 w-10 rounded-full shrink-0">
                {initials}
            </button>
            <div className="m-auto space-y-1">
                <div className="font-medium text-sm">{name}</div>
                <div className="text-xs">{comment}</div>
            </div>
        </div>
    )
}

export default CommentCard;