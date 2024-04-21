// Weather.jsx
import React, {useEffect, useState} from 'react';
import './css/Weather.css';
import CurrentWeatherConditions from "../components/CurrentWeatherConditions.jsx";
import HourlyWeatherConditions from "../components/HourlyWeatherConditions.jsx";
import FiveDayWeatherConditions from "../components/FiveDayWeatherConditions.jsx";

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

            <div className="weatherContainer">
                <CurrentWeatherConditions data={currentConditions} />

                <HourlyWeatherConditions data={hourlyConditions} />

                <FiveDayWeatherConditions data={fiveDayConditions} />
            </div>
        </>
    );
}

export default Weather;