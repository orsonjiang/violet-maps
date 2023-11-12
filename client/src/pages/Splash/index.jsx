import TitleButton from "./components/TitleButton";

const Splash = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col w-2/3 p-10 items-center justify-center bg-gradient-to-b from-purple-400/[0.8] to-indigo-300">
                <div className="font-bold text-5xl my-8 text-white">Violet Maps</div>
                <div className="text-xl min-w-xl text-violet-50">
                    Connect with other map enthusiasts around you on Violet
                    Maps.
                </div>
                <div className="max-w-xl text-lg font-medium text-violet-600 my-12 bg-white/[0.65] rounded-lg px-12 py-9">
                    <ul className="list-disc">
                        <li >Customize your own maps</li>
                        <li>Add custom labels</li>
                        <li>Color code countries or states</li>
                        <li>Publish your maps to others or keep them private for personal viewing
                        </li>
                        <li>View, like and comment on other maps</li>
                        <li>Free and easy to use </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col p-8 grow justify-center items-center bg-white">
                <TitleButton title={"Don't have an account?"} buttonText={"Sign Up"} />
                <TitleButton title={"Already have an account?"} buttonText={"Log In"} />
                <TitleButton title={"Want to anonymously browse?"} buttonText={"Continue as Guest"} />
            </div>
        </div>
    );
};

export default Splash;
