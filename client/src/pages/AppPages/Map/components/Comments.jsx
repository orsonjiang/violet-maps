import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CommentCard from './CommentCard';

import { addComment } from '../../../../actions/map';

const Comments = ({list}) => {
    const dispatch = useDispatch();
    const [text, handleText] = useState("");

    const { user } = useSelector((state) => state.user);
    const { map } = useSelector((state) => state.map.present);

    const handleAddComment = (event) => {
        console.log(map)
        if (event.key == "Enter") {
            dispatch(addComment({
                comment: text,
                user: user._id
            }));
        }
    }

    return(
        <div className='w-1/3 bg-violet-100 rounded-lg'>
            <div className="m-5 mb-1 pb-2">
                <h3 className="font-medium">{`${map.social.comments.length} Comments`}</h3>
                <div className="mt-3 flex space-x-4">
                    <button className="flex gap-[1px] items-center justify-center h-10 w-10 shadow-none hover:shadow-none font-semibold bg-indigo-200 text-xs p-2 rounded-full shrink-0">
                        <p>{user.firstName.charAt(0)}</p>
                        <p>{user.lastName.charAt(0)}</p>
                    </button>
                    <input
                        type="search"
                        id="commentinput"
                        className="block px-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                        placeholder="Add a comment..."
                        required=""
                        value={text}
                        onChange={(event) => handleText(event.target.value)}
                        onKeyDown={(event) => handleAddComment(event)}
                    />
                </div>
                <div className="overflow-hidden hover:overflow-y-scroll max-h-[30rem] mt-3 space-y-2">
                    {list.map((c) => {
                        return <CommentCard initials={c.userInitial} name={c.username} comment={c.comment} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Comments;