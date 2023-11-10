import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Comment from './components/Comment';
import { fetchComments } from '../../helpers/fetch';
import api from "../../api/api";

const Home = () => {
    const { comments } = useSelector((state) => state.comments);

    useEffect(() => {
        fetchComments();
    }, []);
 
    const [newComment, setNewComment] = useState("");

    const handleComment = (event) => {
        event.preventDefault();
        const text = event.target.value;
        setNewComment(text);
    }

    const handleAddComment = async () => {
        await api.addComment(newComment);       
        fetchComments();
        setNewComment("");
    }

    return (
        <div>
            <div className="flex p-2">
                <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white w-auto">
                    Violet Maps Demo App (Build 1) Test for Build One shovon0203
                </h1>
            </div>
            <div className="p-2">
                <label
                    htmlFor="first_name"
                    className="block mx-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Leave a Comment
                </label>
                <div className="flex">
                    <input
                        type="text"
                        className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Type here..."
                        onChange={handleComment}
                        value={newComment}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleAddComment}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <ol>
                {comments.map((comment) => {
                    return (
                        <Comment key={comment._id} _id={comment._id} content={comment.content} />
                    );
                })}
            </ol>
        </div>
    );
};

export default Home;
