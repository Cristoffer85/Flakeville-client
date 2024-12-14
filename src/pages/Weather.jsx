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

        if (cachedCurrentConditions && Date.now() - cachedCurrentConditionsTime < 30 * 60 * 1000) {
            setCurrentConditions(JSON.parse(cachedCurrentConditions));
        } else {
            fetch('https://flakeville-server.onrender.com/skiResort/currentConditions')
                .then(response => response.json())
                .then(data => {
                    setCurrentConditions(data);
                    localStorage.setItem('currentConditions', JSON.stringify(data));
                    localStorage.setItem('currentConditionsTime', Date.now());
                });
        }


        const cachedFiveDayConditions = localStorage.getItem('fiveDayConditions');
        const cachedFiveDayConditionsTime = localStorage.getItem('fiveDayConditionsTime');

        if (cachedFiveDayConditions && Date.now() - cachedFiveDayConditionsTime < 30 * 60 * 1000) {
            setFiveDayConditions(JSON.parse(cachedFiveDayConditions));
        } else {
            fetch('https://flakeville-server.onrender.com/skiResort/5DayConditions')
                .then(response => response.json())
                .then(data => {
                    setFiveDayConditions(data);
                    localStorage.setItem('fiveDayConditions', JSON.stringify(data));
                    localStorage.setItem('fiveDayConditionsTime', Date.now());
                });
        }

    }, []);

    return (
        <div className="accountContainer">
            <div className="sidebar">
                <p onClick={() => setCurrentSection('currentConditions')}>Current Conditions</p>
                <p onClick={() => setCurrentSection('fiveDayConditions')}>5-Day Conditions</p>
            </div>
                {currentSection === 'currentConditions' && (
                    <div className="currentWeatherConditionsBox">
                        <CurrentWeatherConditions data={currentConditions}/>
                    </div>
                )}
                {currentSection === 'fiveDayConditions' && (
                    <div className="fiveDayWeatherConditionsBox">
                        <FiveDayWeatherConditions data={fiveDayConditions}/>
                    </div>
                )}
        </div>
    );
}

export default Weather;