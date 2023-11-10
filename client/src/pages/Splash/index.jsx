import TitleButton from "./components/TitleButton";

const Splash = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col p-32 justify-center bg-gradient-to-b from-[#B998EE] to-[#F3E7FF]">
                <div className="font-bold text-6xl my-8 text-white">Violet Maps</div>
                <div className="text-2xl min-w-xl text-[#F3E7FF]">
                    Connect with other map enthusiasts around you on Violet
                    Maps.
                </div>
                <div className="text-lg my-12 bg-white rounded-lg px-8 py-10">
                    <ul>
                        <li className="text-[#9479BE] font-medium">Customize your very own map</li>
                        <li className="text-[#9479BE] font-medium">Add custom labels</li>
                        <li className="text-[#9479BE] font-medium">Color code countries or states</li>
                        <li className="text-[#9479BE] font-medium">
                            Publish your maps to others or keep them private for
                            personal viewing
                        </li>
                        <li className="text-[#9479BE] font-medium">View, like and comment on other maps</li>
                        <li className="text-[#9479BE] font-medium"> Free and easy to use </li>
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
