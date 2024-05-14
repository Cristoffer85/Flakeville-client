import React, {useContext, useEffect} from 'react';
import './css/Home.css';
import LiftsContext from "../components/LiftsContext.jsx";

function Home() {

    const { lifts, setLifts } = useContext(LiftsContext);

    useEffect(() => {
        fetchLifts();
    }, []);

    const fetchLifts = async () => {
        const response = await fetch('https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/skilifts/getAllLifts');
        const data = await response.json();
        if (Array.isArray(data)) {
            setLifts(data);
        } else {
            console.error('Data is not an array:', data);
        }
        setLifts(data);
    };

    return (
        <>
            <div className="box1">
                <div className="welcome-box">
                    <h2>Welcome!</h2>
                    <p><b>We welcome you to SNÖFJÄLLBY.</b></p>

                    <p>The metropol of both skiing - adventure, supermart and utopia at
                        the same time!</p>
                    <p>Feel free to navigate across our site as you please.</p>

                    <p>We guarantee you an utmost chillingly adventure!</p>
                </div>
            </div>

            <div className="box2">
                <h2>Latest News</h2>
                <p className={"news1"}><b>2024-05-14</b> Possible sighting of big B (Bjärv) again north of Galenstupet
                    after ski.
                </p>
                <p className={"news2"}><b>2024-05-01</b> Summer season and all its activites opened!</p>
                <p className={"news3"}><b>2024-04-25</b> Snowmobile activities no longer available due to lack of snow</p>
                <p className={"news4"}><b>2024-04-14</b> Someone has forgotten a glove near Hvitfjäll summit</p>
            </div>

            <div className="box3">
                <h2>Latest products in store</h2>
                <p>- New tours and food options added, be sure to check them out!</p>
            </div>
            <div className="sidebar-home">
                <h2 className={"text"}>Lift Status</h2>
                {lifts.map(lift => (
                    <div key={lift.id} className="lift-container">
                        <h3>Lift {lift.id}</h3>
                        <p className="text">{lift.description}</p>
                        <div className={`sidebar-status-light ${lift.operating ? 'green' : 'red'}`}></div>
                        <div className="path-rectangle"><p className={"Lift-name-1"}>GALENSTUPET</p></div>
                        <div className="path-rectangle2"><p className={"Lift-name-2"}>BØRIKKEFÆRDAS</p></div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;