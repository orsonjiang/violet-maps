import { Link, useNavigate } from 'react-router-dom';

import auth from '../../../api/auth';
import store from '../../../store';
import { setUser } from '../../../actions/user';
import Form from '../components/Form';
import Field from '../components/Field';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const req = await auth.postLogin(data)
            .catch((err) => {
                setError(err.response.data.error)
            });

        if (req.status === 200) {
            store.dispatch(setUser(req.data));
            navigate("/app/home");
        } else {
            console.log(req.error);
        }
    };

    return (
        <Form title="Sign in to your account" onSubmit={handleLogin}>
            <Field id="email" placeholder="Email" />
            <Field id="password" placeholder="Password" type="password" />
            {error != "" ? <div className='text-sm text-center text-red-600'>{error}</div> : ""}
            <div className="flex justify-start pb-2">
                <Link
                    to={'/requestReset'}
                    className="text-sm text-gray-500 font-medium hover:underline"
                >
                    Forgot password?
                </Link>
            </div>
            <div className="flex flex-col w-full gap-6">
                <button
                    type="submit"
                    className="rounded-full text-white bg-accent py-2 shadow-md hover:outline-none focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium text-center"
                >
                    Log in
                </button>
                <div className="flex items-center">
                    <hr className="flex-grow border-t border-gray-300" />
                    <div className="px-4">OR</div>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
                <Link
                    to={'/register'}
                    className="rounded-full text-white bg-accent py-2 shadow-md hover:outline-none hover:ring-2 hover:ring-purple-300 font-medium text-center"
                >
                    <button>Sign Up</button>
                </Link>
            </div>
        </Form>
    );
};

export default Login;
