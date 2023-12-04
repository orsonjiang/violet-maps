import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import auth from '../../../api/auth';
import Form from '../components/Form';
import Field from '../components/Field';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get('email'),
        };

        setMsg("Loading...")

        const req = await auth.postRequestReset(data).catch((err) => {
            setError(err.response.data.error)
        });


        if (req.status === 200) {
            setMsg("Please check your email for a reset link.")
        } else {
            console.log(req.error);
        }
    };

    return (
        <Form title="Reset your password" onSubmit={handleRegister}>
            <Field id="email" placeholder="Email" type="email" />
            {error != "" ? <div className='text-sm text-center text-red-600'>{error}</div> : ""}
            {msg != "" ? <div className='text-sm text-center text-green-600'>{msg}</div> : ""}
            <p className="text-sm font-semibold text-black">
                Remember your password?{' '}
                <Link
                    to={'/login'}
                    className="font-semibold text-violet-400 hover:underline "
                >
                    Sign in
                </Link>
            </p>
            <button id="registerButton" className="rounded-full text-white bg-accent py-2 shadow-md hover:outline-none hover:ring-2 hover:ring-purple-300 font-medium text-center">
                Request Reset
            </button>
        </Form>
    );
};

export default Register;
