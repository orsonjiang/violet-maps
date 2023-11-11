const Register = () => {
    return (
        <div className="flex flex-col min-h-screen justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            href="#"
                            className="text-xl text-center text-[#3F37C9] font-bold font-italic leading-tight tracking-none text-gray-900 md:text-3xl dark:text-white"
                        >
                            Violet Maps
                        </h1>
                        <h2 className="text-center font-semibold leading-none tracking-none text-gray-900 md:text-xl dark:text-white">
                            Create your new account
                        </h2>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className="flex gap-4">
                                <div>
                                    <input
                                        type="firstName"
                                        name="firstName"
                                        id="firstName"
                                        className="bg-gray-50 border text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="First name"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <input
                                        type="lastName"
                                        name="lastName"
                                        id="lastName"
                                        className="bg-gray-50 border text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                    className="bg-gray-50 border text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email"
                                    required=""
                                />
                            </div>
                            <div>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                    className="bg-gray-50 border text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <p className="text-sm font-medium font-semibold text-black dark:text-gray-400">
                                Already have an account?{' '}
                                <a
                                    href="#"
                                    className="font-medium font-semibold text-[#560BAD] hover:underline dark:text-primary-500"
                                >
                                    Sign in
                                </a>
                            </p>
                            <div className='grid grid-cols-2 grid-row-1 my-4'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        type="submit"
                                        className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-4 shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
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
