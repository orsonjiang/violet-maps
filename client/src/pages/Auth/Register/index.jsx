import { Link } from 'react-router-dom';

import Field from './components/Field';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
        }

        if (data !== formData.get("confirmPassword")) {
            // Error modal.
        }

        console.log(data)
    };

    return (
        <div className="flex flex-col bg-violet-200 min-h-screen justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center justify-center w-[60rem] h-[34rem] bg-white rounded-lg shadow-xl mt-0 max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 m-8">
                        <div
                            className="text-2xl text-center text-indigo-500 font-bold font-italic leading-tight tracking-none "
                        >
                            Violet Maps
                        </div>
                        <h2 className="text-center pb-5 font-semibold leading-none tracking-none text-gray-900 text-md ">
                            Create your new account
                        </h2>
                        <form className="space-y-4" onSubmit={handleRegister}>
                            <div className="flex gap-4">
                                <Field id="firstName" placeholder="First name"/>
                                <Field id="lastName" placeholder="Last name"/>
                            </div>
                            <Field id="email" placeholder="Email"/>
                            <Field id="username" placeholder="Username"/>
                            <Field id="password" placeholder="Password"/>
                            <Field id="confirmPassword" placeholder="Confirm password"/>
                            <p className="text-sm font-semibold text-black pt-5">
                                Already have an account?{' '}
                                <Link to={"/login"}
                                    className="font-semibold text-violet-400 hover:underline "
                                >
                                    Sign in
                                </Link>
                            </p>
                            <div className='grid grid-cols-2 grid-row-1 my-4'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        type="submit"
                                        className="text-white bg-[#8187DC] rounded-full py-1.5 px-6 shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
