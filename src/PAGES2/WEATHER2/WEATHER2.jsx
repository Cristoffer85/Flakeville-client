import React, { useEffect, useState } from 'react';

import CurrentWeatherConditions from "../../COMPONENTS2/CURRENTWEATHERCONDITIONS2/CURRENTWEATHERCONDITIONS2.js";
import FiveDayWeatherConditions from "../../COMPONENTS2/FIVEDAYWEATHERCONDITIONS2/FIVEDAYWEATHERCONDITIONS2.js";
import { fetchCurrentConditions, fetchFiveDayConditions } from '../../API2/weatherapi/weatherapi.js';

import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container-fluid" style={{ paddingTop: '7rem' }}>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="list-group">
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'currentConditions' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('currentConditions')}
                        >
                            Current Conditions
                        </button>
                        <button
                            type="button"
                            className={`list-group-item list-group-item-action ${currentSection === 'fiveDayConditions' ? 'active' : ''}`}
                            onClick={() => setCurrentSection('fiveDayConditions')}
                        >
                            5-Day Conditions
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    {currentSection === 'currentConditions' && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <CurrentWeatherConditions data={currentConditions} />
                            </div>
                        </div>
                    )}
                    {currentSection === 'fiveDayConditions' && (
                        <div className="card mb-3" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                            <div className="card-body">
                                <FiveDayWeatherConditions data={fiveDayConditions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Weather;