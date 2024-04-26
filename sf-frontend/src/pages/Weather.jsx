import React, {useEffect, useState} from 'react';
import './css/Weather.css';
import CurrentWeatherConditions from "../components/CurrentWeatherConditions.jsx";
import HourlyWeatherConditions from "../components/HourlyWeatherConditions.jsx";
import FiveDayWeatherConditions from "../components/FiveDayWeatherConditions.jsx";

function Weather() {    // Function component Weather, with 30-minute interval fetch for current and hourly and 5-day weather conditions.
                        // Caches in local storage to avoid to many calls to API (Its a free good one, and it crashes otherwise)

    const [currentConditions, setCurrentConditions] = useState(null);
    const [hourlyConditions, setHourlyConditions] = useState(null);
    const [fiveDayConditions, setFiveDayConditions] = useState(null);

    useEffect(() => {
        const cachedCurrentConditions = localStorage.getItem('currentConditions');
        const cachedCurrentConditionsTime = localStorage.getItem('currentConditionsTime');

        if (cachedCurrentConditions && Date.now() - cachedCurrentConditionsTime < 30 * 60 * 1000) {
            setCurrentConditions(JSON.parse(cachedCurrentConditions));
        } else {
            fetch('http://localhost:8080/skiResort/currentConditions')
                .then(response => response.json())
                .then(data => {
                    setCurrentConditions(data);
                    localStorage.setItem('currentConditions', JSON.stringify(data));
                    localStorage.setItem('currentConditionsTime', Date.now());
                });
        }

        // Comment out the code for fetching and setting hourly conditions
        /*
        const cachedHourlyConditions = localStorage.getItem('hourlyConditions');
        const cachedHourlyConditionsTime = localStorage.getItem('hourlyConditionsTime');

        if (cachedHourlyConditions && Date.now() - cachedHourlyConditionsTime < 30 * 60 * 1000) {
            setHourlyConditions(JSON.parse(cachedHourlyConditions));
        } else {
            fetch('http://localhost:8080/skiResort/hourlyConditions')
                .then(response => response.json())
                .then(data => {
                    setHourlyConditions(data);
                    localStorage.setItem('hourlyConditions', JSON.stringify(data));
                    localStorage.setItem('hourlyConditionsTime', Date.now());
                });
        }
        */

        // Comment out the code for fetching and setting 5-day conditions
        /*
        const cachedFiveDayConditions = localStorage.getItem('fiveDayConditions');
        const cachedFiveDayConditionsTime = localStorage.getItem('fiveDayConditionsTime');

        if (cachedFiveDayConditions && Date.now() - cachedFiveDayConditionsTime < 30 * 60 * 1000) {
            setFiveDayConditions(JSON.parse(cachedFiveDayConditions));
        } else {
            fetch('http://localhost:8080/skiResort/5DayConditions')
                .then(response => response.json())
                .then(data => {
                    setFiveDayConditions(data);
                    localStorage.setItem('fiveDayConditions', JSON.stringify(data));
                    localStorage.setItem('fiveDayConditionsTime', Date.now());
                });
        }
        */
    }, []);

    return (
        <>
            <div className="weatherContainer">
                <CurrentWeatherConditions data={currentConditions} />

                // Comment out the components for displaying hourly and 5-day conditions
                {/* <HourlyWeatherConditions data={hourlyConditions} /> */}
                {/* <FiveDayWeatherConditions data={fiveDayConditions} /> */}
            </div>
        </>
    );
}

export default Weather;