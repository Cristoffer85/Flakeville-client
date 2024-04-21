import React, {useEffect, useState} from 'react';
import './css/Weather.css';
import CurrentConditions from "./CurrentConditions";
import HourlyConditions from './HourlyConditions'; // import the HourlyConditions component

function Weather() {

    const [currentConditions, setCurrentConditions] = useState(null);
    const [hourlyConditions, setHourlyConditions] = useState(null);
    const [fiveDayConditions, setFiveDayConditions] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/skiResort/currentConditions')
            .then(response => response.json())
            .then(data => setCurrentConditions(data));

        fetch('http://localhost:8080/skiResort/hourlyConditions')
            .then(response => response.json())
            .then(data => setHourlyConditions(data));

        fetch('http://localhost:8080/skiResort/5DayConditions')
            .then(response => response.json())
            .then(data => setFiveDayConditions(data));
    }, []);

    return (
        <>
            <div className="weatherPageTitleAlign">
                <h1 className="pageTitle">SNÖFJÄLLBY WEATHER</h1>
            </div>

            <div>
                <h1>Current Conditions</h1>
                <CurrentConditions data={currentConditions} />

                <h1>Hourly Conditions</h1>
                <HourlyConditions data={hourlyConditions} />

                <h1>5 Day Conditions</h1>
                {/* Display 5 day conditions data here */}
                {fiveDayConditions && <p>{JSON.stringify(fiveDayConditions)}</p>}
            </div>
        </>
    );
}

export default Weather;