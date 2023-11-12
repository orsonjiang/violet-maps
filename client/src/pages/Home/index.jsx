import MapCard from './components/MapCard';

const Home = () => {
    const exampleListOfMaps = [
        {
            id: 0,
            name: 'Map of Europe',
            owner: 'Fanny Li',
            publishedDate: new Date(),
            tags: ['Europe', 'Population'],
        },
        {
            id: 0,
            name: 'Map of China',
            owner: 'Kevin Chen',
            publishedDate: new Date(),
            tags: ['China', 'Population'],
        },
        {
            id: 0,
            name: 'Map of USA',
            owner: 'Kayla Fang',
            publishedDate: new Date(),
            tags: ['USA', 'Population'],
        },
        {
            id: 0,
            name: 'Map of Korea',
            owner: 'Orson Jiang',
            publishedDate: new Date(),
            tags: ['Korea', 'Population'],
        },
        {
            id: 0,
            name: 'Map of Korea',
            owner: 'Orson Jiang',
            publishedDate: new Date(),
            tags: ['Korea', 'Population'],
        },
        {
            id: 0,
            name: 'Map of Japan',
            owner: 'Rachel Cong',
            publishedDate: new Date(),
            tags: ['Korea', 'Population'],
        },
        {
            id: 0,
            name: 'Map of France',
            owner: 'Katlyn Ye',
            publishedDate: new Date(),
            tags: ['Korea', 'Population'],
        },
    ];

    return (
        <div className="my-8 mx-20">
            <div>
                <div className="my-4 text-2xl font-bold">
                    Your Library
                </div>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {exampleListOfMaps.map((mapInfo, index) => {
                    return <MapCard key={index} mapInfo={mapInfo} />;
                })}
            </div>
        </div>
    );
};

export default Home;
