import { Link, useNavigate } from 'react-router-dom';

import auth from '../../../api/auth';
import store from '../../../store';
import { setUser } from '../../../actions/user';
import Form from '../components/Form';
import Field from '../components/Field';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
        };

        if (data.password !== formData.get('confirmPassword')) {
            console.log('no duplicate password');
            return;
        }

        const req = await auth.postRegister(data);
        if (req.status === 200) {
            store.dispatch(setUser(req.data));
            navigate("/app/home");
        } else {
            console.log(req.error);
        }
    };

    return (
        <Form title="Create your new account" onSubmit={handleRegister}>
            <div className="flex gap-4">
                <Field id="firstName" placeholder="First name" />
                <Field id="lastName" placeholder="Last name" />
            </div>
            <Field id="email" placeholder="Email" />
            <Field id="username" placeholder="Username" />
            <Field id="password" placeholder="Password" type="password" />
            <Field
                id="confirmPassword"
                placeholder="Confirm password"
                type="password"
            />
            <p className="text-sm font-semibold text-black py-2">
                Already have an account?{' '}
                <Link
                    to={'/login'}
                    className="font-semibold text-violet-400 hover:underline "
                >
                    Sign in
                </Link>
            </p>
            <button id="registerButton" className="rounded-full text-white bg-[#8187DC] py-2 shadow-md hover:outline-none hover:ring-2 hover:ring-purple-300 font-medium text-center">
                Sign Up
            </button>
        </Form>
    );
};

export default Register;
