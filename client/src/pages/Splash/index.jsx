import TitleButton from "./components/TitleButton";

const Splash = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col p-32 justify-center">
                <div className="text-6xl my-8">Violet Maps</div>
                <div className="text-2xl min-w-xl">
                    Connect with other map enthusiasts around you on Violet
                    Maps.
                </div>
                <div className="text-xl my-12 bg-white rounded-lg p-4">
                    <ul>
                        <li>Customize your very own map</li>
                        <li>Add custom labels</li>
                        <li>Color code countries or states</li>
                        <li>
                            Publish your maps to others or keep them private for
                            personal viewing
                        </li>
                        <li>View, like and comment on other maps</li>
                        <li>Free and easy to use </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col p-8 grow justify-center items-center">
                <TitleButton title={"Don't have an account?"} buttonText={"Sign Up"} />
                <TitleButton title={"Already have an account?"} buttonText={"Log In"} />
                <TitleButton title={"Want to anonymously browse?"} buttonText={"Continue as Guest"} />
            </div>
        </div>
    );
};

export default Splash;
