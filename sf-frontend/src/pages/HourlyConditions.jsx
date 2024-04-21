// HourlyConditions.jsx
import React, { useState } from 'react';
import './HourlyConditions.css';

function HourlyConditions({ data }) {
    if (!data) {
        return null;
    }

    return (
        <div className="hourly-conditions">
            <h2>Hourly Conditions</h2>
            {data.forecast.map((forecast, index) => {
                const [isExpanded, setIsExpanded] = useState(false);

                return (
                    <div key={index} className="forecast">
                        <h3 onClick={() => setIsExpanded(!isExpanded)}>{forecast.time}</h3>
                        {isExpanded && (
                            <>
                                <p>Summary: {forecast.summary}</p>
                                <p>Wind Speed: {forecast.windSpeed}</p>
                                <p>Wind Direction: {forecast.windDirection}</p>
                                <p>Snow: {forecast.snow}</p>
                                <p>Rain: {forecast.rain}</p>
                                <p>Max Temp: {forecast.maxTemp}</p>
                                <p>Wind Chill: {forecast.windChill}</p>
                                <p>Humidity: {forecast.humidity}</p>
                                <p>Freeze Level: {forecast.freezeLevel}</p>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default HourlyConditions;