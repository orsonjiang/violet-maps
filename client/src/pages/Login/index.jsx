const Login = () => {
    return (
        <div className="flex flex-col min-h-screen justify-center ">
            <div className="flex flex-col items-center justify-center px-6 py-8 m-auto md:h-screen lg:py-0">
                <div className="w-[60rem] h-[34rem] bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:m-8 ">
                        <h1
                            href="#"
                            className="text-xl text-center text-[#3F37C9] font-bold font-italic leading-tight tracking-none md:text-3xl dark:text-white"
                        >
                            Violet Maps
                        </h1> 
                        <h2 className="text-center font-semibold leading-none tracking-none text-gray-900 md:text-xl dark:text-white">
                            Sign in to your account
                        </h2>
                        <form className="space-y-4 md:space-y-4" action="#">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50  text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email or username"
                                    required=""
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="bg-gray-50 text-gray-900 shadow-md sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="pt-5 text-sm text-black font-semibold dark:text-gray-400">
                                Forgot your{' '}
                                <a
                                    href="#"
                                    className="font-semibold text-[#560BAD] hover:underline dark:text-primary-500"
                                >
                                    password?
                                </a>
                            </div>
                            <div className="text-sm font-semibold  text-black dark:text-gray-400">
                                New to Violet Maps?{' '}
                                <a
                                    href="#"
                                    className="font-semibold text-[#560BAD] hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </a>
                            </div>
                            <div className='grid grid-cols-2 grid-row-1 my-4'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        type="submit"
                                        className="rounded-full text-white bg-[#8187DC] py-1.5 px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium text-md text-center"
                                    >
                                        Log in
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

export default Login;
