const Register = () => {
    return (
        <div className="flex flex-col bg-violet-200 min-h-screen justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center justify-center w-[60rem] h-[34rem] bg-white rounded-lg shadow-xl dark:border mt-0 max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 m-8">
                        <h1
                            href="#"
                            className="text-2xl text-center text-indigo-500 font-bold font-italic leading-tight tracking-none dark:text-white"
                        >
                            Violet Maps
                        </h1>
                        <h2 className="text-center pb-5 font-semibold leading-none tracking-none text-gray-900 text-md dark:text-white">
                            Create your new account
                        </h2>
                        <form className="space-y-4" action="#">
                            <div className="flex gap-4">
                                <div>
                                    <input
                                        type="firstName"
                                        name="firstName"
                                        id="firstName"
                                        className="bg-gray-50 text-gray-900 shadow-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="First name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <input
                                        type="lastName"
                                        name="lastName"
                                        id="lastName"
                                        className="bg-gray-50 text-gray-900 shadow-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Last name"
                                        required=""
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 text-gray-900 shadow-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email"
                                    required=""
                                />
                            </div>
                            <div>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 text-gray-900 shadow-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                    required=""
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="bg-gray-50 text-gray-900 shadow-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <p className="text-sm font-semibold text-black dark:text-gray-400 pt-5">
                                Already have an account?{' '}
                                <a
                                    href=""
                                    className="font-semibold text-violet-400 hover:underline dark:text-primary-500"
                                >
                                    Sign in
                                </a>
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
