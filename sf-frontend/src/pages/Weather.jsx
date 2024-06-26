import React, {useEffect, useState} from 'react';
import './css/Weather.css';
import CurrentWeatherConditions from "../components/CurrentWeatherConditions.jsx";
import FiveDayWeatherConditions from "../components/FiveDayWeatherConditions.jsx";

function Weather() {    // Function component Weather, with a 1-minute interval fetch for current and hourly and 5-day weather conditions.
                        // Caches in local storage to avoid to many calls to API (Its a free good one, and it crashes otherwise)

    const [currentConditions, setCurrentConditions] = useState(null);
    const [fiveDayConditions, setFiveDayConditions] = useState(null);
    const [currentSection, setCurrentSection] = useState('currentConditions');

    useEffect(() => {
        const cachedCurrentConditions = localStorage.getItem('currentConditions');
        const cachedCurrentConditionsTime = localStorage.getItem('currentConditionsTime');

        if (cachedCurrentConditions && Date.now() - cachedCurrentConditionsTime < 1 * 60 * 1000) {
            setCurrentConditions(JSON.parse(cachedCurrentConditions));
        } else {
            fetch('https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/skiResort/currentConditions')
                .then(response => response.json())
                .then(data => {
                    setCurrentConditions(data);
                    localStorage.setItem('currentConditions', JSON.stringify(data));
                    localStorage.setItem('currentConditionsTime', Date.now());
                });
        }


        const cachedFiveDayConditions = localStorage.getItem('fiveDayConditions');
        const cachedFiveDayConditionsTime = localStorage.getItem('fiveDayConditionsTime');

        if (cachedFiveDayConditions && Date.now() - cachedFiveDayConditionsTime < 1 * 60 * 1000) {
            setFiveDayConditions(JSON.parse(cachedFiveDayConditions));
        } else {
            fetch('https://snofjallbyservice-snofjallbywithpt.azuremicroservices.io/skiResort/5DayConditions')
                .then(response => response.json())
                .then(data => {
                    setFiveDayConditions(data);
                    localStorage.setItem('fiveDayConditions', JSON.stringify(data));
                    localStorage.setItem('fiveDayConditionsTime', Date.now());
                });
        }

    }, []);

    return (
        <div className="weatherContainer">
            <div className="sidebar">
                <p onClick={() => setCurrentSection('currentConditions')}>Current Conditions</p>
                <p onClick={() => setCurrentSection('fiveDayConditions')}>5-Day Conditions</p>
            </div>
            {currentSection === 'currentConditions' && <CurrentWeatherConditions className="current-conditions-box" data={currentConditions} />}
            {currentSection === 'fiveDayConditions' && <FiveDayWeatherConditions className="five-day-conditions-box" data={fiveDayConditions} />}
        </div>
    );
}

export default Weather;