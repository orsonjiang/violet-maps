const CommentCard = ({user, comment}) => {
    if (!user || !comment) return <div></div>;

    return (
        <div className="pb-2 flex my-1 space-x-4">
            <button className="flex gap-[1px] items-center justify-center font-semibold bg-indigo-300 text-xs h-10 w-10 rounded-full shrink-0">
                <p>{user.firstName.charAt(0)}</p>
                <p>{user.lastName.charAt(0)}</p>
            </button>
            <div className="m-auto space-y-1">
                <div className="font-medium text-sm">{user.username}</div>
                <div className="text-xs">{comment}</div>
            </div>
        </div>
    )
}

export default CommentCard;