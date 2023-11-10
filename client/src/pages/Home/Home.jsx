import {Typography} from "@material-tailwind/react";
import AppBanner from "../components/AppBanner";
import MapCard from "./components/MapCard";

const Home = () => {
    const exampleListOfMaps = [
        {
            id: 0,
            name: "Map of Europe",
            owner: "Fanny Li",
            publishedDate: new Date(),
            tags: ["Europe", "Population"]
        },
        {
            id: 0,
            name: "Map of China",
            owner: "Kevin Chen",
            publishedDate: new Date(),
            tags: ["China", "Population"]
        },
        {
            id: 0,
            name: "Map of USA",
            owner: "Kayla Fang",
            publishedDate: new Date(),
            tags: ["USA", "Population"]
        },
        {
            id: 0,
            name: "Map of Korea",
            owner: "Orson Jiang",
            publishedDate: new Date(),
            tags: ["Korea", "Population"]
        }
    ]
    return (
        <div>
            <AppBanner/>
            <div className="my-10 mx-16">
                <div>
                    <Typography variant="h5" className="mb-4">Your Library</Typography>
                </div>
                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {exampleListOfMaps.map((mapInfo, index) => {
                        return (<MapCard 
                            key={index}
                            mapInfo={mapInfo}
                        />)
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;