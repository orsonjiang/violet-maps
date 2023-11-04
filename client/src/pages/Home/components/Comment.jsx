import { fetchComments } from '../../../helpers/fetch';
import api from '../../../api/api';
import { useState } from 'react';

const Comment = (props) => {
    const { _id, content } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [newComment, setNewComment] = useState(content);

    const handleComment = (event) => {
        event.preventDefault();
        const text = event.target.value;
        setNewComment(text);
    };

    const handleEditComment = async () => {
        await api.editComment(_id, newComment);
        fetchComments();
        setIsEditing(false);
        setNewComment('');
    };

    const handleEditOn = async () => {
        setIsEditing(true);
    };

    const handleDelete = async () => {
        await api.deleteComment(_id);
        fetchComments();
    };

    const editBox = (
        <div className='flex'>
            <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full px-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
                placeholder="Type here..."
                onChange={handleComment}
                value={newComment}
                required
            />
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center px-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleEditComment}
            >
                Edit
            </button>
        </div>
    );

    return (
        <li
            className={
                'flex bg-zinc-200 dark:bg-zinc-900 rounded-xl m-2 overflow-clip p-2 text-white fill-white align-middle'
            }
        >
            <div className="grow mr-1">{isEditing ? editBox : content}</div>
            <div className="flex justify-end align-middle">
                {isEditing ? "" : <button onClick={handleEditOn}>
                    <svg
                        className="mx-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M22.824,1.176a4.108,4.108,0,0,0-5.676,0L1.611,16.713A5.464,5.464,0,0,0,0,20.6v1.9A1.5,1.5,0,0,0,1.5,24H3.4a5.464,5.464,0,0,0,3.889-1.611L22.824,6.852A4.018,4.018,0,0,0,22.824,1.176ZM5.166,20.268A2.519,2.519,0,0,1,3.4,21H3v-.4a2.52,2.52,0,0,1,.732-1.768L15.3,7.267,16.733,8.7ZM20.7,4.731,18.854,6.58,17.42,5.146,19.27,3.3a1.037,1.037,0,0,1,1.433,0A1.015,1.015,0,0,1,20.7,4.731Z" />
                    </svg>
                </button>}
                <button onClick={handleDelete}>
                    <svg
                        className="mx-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
                        <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
                        <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default Comment;
