import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import { setUser } from '../../../actions/user';
import auth from '../../../api/auth';
import Form from '../components/Form';
import Field from '../components/Field';


const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userId, token } = useParams();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            password: formData.get('password'),
            userId: userId,
            token: token
        };

        if (data.password !== formData.get('confirmPassword')) {
            setError('Passwords are not the same.');
            return;
        }

        const req = await auth.postReset(data).catch((err) => {
            setError(err.response.data.error)
        });

        if (req.status === 200) {
            dispatch(setUser(req.data));
            navigate("/app/home");
            dispatch(setView("HOME"));
        } else {
            console.log(req.error);
        }
    };

    return (
        <Form title="Create your new password" onSubmit={handleRegister}>
            <Field id="password" placeholder="Password" type="password" />
            <Field
                id="confirmPassword"
                placeholder="Confirm password"
                type="password"
            />
            {error != "" ? <div className='text-sm text-center text-red-600'>{error}</div> : ""}
            {msg != "" ? <div className='text-sm text-center text-green-600'>{msg}</div> : ""}
            <button id="registerButton" className="rounded-full text-white bg-accent py-2 shadow-md hover:outline-none hover:ring-2 hover:ring-purple-300 font-medium text-center">
                Reset
            </button>
        </Form>
    );
};

export default ResetPassword;