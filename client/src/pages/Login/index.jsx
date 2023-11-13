import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex flex-col min-h-screen bg-violet-200 justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-[60rem] h-[34rem] bg-white rounded-lg shadow-xl dark:border mt-0 max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 m-8 ">
                        <h1
                            href="#"
                            className="text-2xl text-center text-indigo-500 font-bold font-italic leading-tight tracking-none dark:text-white"
                        >
                            Violet Maps
                        </h1> 
                        <h2 className="text-center pb-5 font-semibold leading-none tracking-none text-gray-900 text-md dark:text-white">
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
                                    className="bg-gray-50 text-gray-900 shadow-md sm:text-sm rounded-lg focus:border-violet-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="pt-5 text-sm text-black font-semibold dark:text-gray-400">
                                Forgot your{' '}
                                <Link to={"/requestReset"}
                                    className="font-semibold text-violet-400 hover:underline dark:text-primary-500"
                                >
                                    password?
                                </Link>
                            </div>
                            <div className="text-sm font-semibold text-black dark:text-gray-400">
                                New to Violet Maps?{' '}
                                <Link to={"/register"}
                                    className="font-semibold text-violet-400 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </div>
                            <div className='grid grid-cols-2 grid-row-1 my-4'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <Link to={"/app/home"}>
                                        <button
                                            type="submit"
                                            className="rounded-full text-white bg-[#8187DC] py-1.5 px-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium text-md text-center"
                                        >
                                            Log in
                                        </button>
                                    </Link>
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
