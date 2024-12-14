import React, { useEffect, useState } from 'react';

import CurrentWeatherConditions from "../../Components/CurrentWeatherConditions/CurrentWeatherConditions.jsx";
import FiveDayWeatherConditions from "../../Components/FiveDayWeatherConditions/FiveDayWeatherConditions.jsx";
import { fetchCurrentConditions, fetchFiveDayConditions } from '../../Api/WeatherApi/WeatherApi.jsx';

import './Weather.css';

function Weather() {
    const [currentConditions, setCurrentConditions] = useState(null);
    const [fiveDayConditions, setFiveDayConditions] = useState(null);
    const [currentSection, setCurrentSection] = useState('currentConditions');

    useEffect(() => {
        const cachedCurrentConditions = localStorage.getItem('currentConditions');
        const cachedCurrentConditionsTime = localStorage.getItem('currentConditionsTime');

        if (cachedCurrentConditions && Date.now() - cachedCurrentConditionsTime < 30 * 60 * 1000) {
            setCurrentConditions(JSON.parse(cachedCurrentConditions));
        } else {
            fetchCurrentConditions().then(data => {
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
            fetchFiveDayConditions().then(data => {
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