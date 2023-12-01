import TitleButton from "./components/TitleButton";
import { useDispatch } from 'react-redux';
import { setView } from '../../actions/home';

const Splash = () => {

    const dispatch = useDispatch()

    const handleGuest = () => {
        dispatch(setView("EXPLORE"));
    }

    return (
        <div className="flex min-h-screen">
            <div className="flex bg-cover bg-center w-2/3 justify-center">
                <div className="w-full p-10 bg-violet-400/[0.6] flex flex-col items-center justify-center">
                    <div className="font-bold text-5xl my-5 text-white">Violet Maps</div>
                    <div className="text-lg min-w-xl text-violet-50">
                        Connect with other map enthusiasts around you on Violet
                        Maps.
                    </div>
                    <div className="max-w-xl text-lg font-normal text-violet-500 my-10 bg-white/[0.7] rounded-lg px-12 py-9">
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
            </div>
            <div className="flex flex-col p-8 grow justify-center items-center bg-white">
                <TitleButton title={"Don't have an account?"} buttonText={"Sign Up"} link={"/register"}/>
                <TitleButton title={"Already have an account?"} buttonText={"Log In"} link={"/login"}/>
                <TitleButton title={"Want to anonymously browse?"} buttonText={"Continue as Guest"} link={"/app/home"}/>
            </div>
        </div>
    );
};

export default Splash;
