// FiveDayConditions.jsx
import React, { useState } from 'react';
import './FiveDayConditions.css';

function FiveDayConditions({ data }) {
    if (!data) {
        return null;
    }

    return (
        <div className="five-day-conditions">
            <h2>5-Day Conditions</h2>
            {data.forecast5Day.map((forecast, index) => {
                const [isExpanded, setIsExpanded] = useState(false);

                return (
                    <div key={index} className="forecast">
                        <h3 onClick={() => setIsExpanded(!isExpanded)}>{forecast.dayOfWeek}</h3>
                        {isExpanded && (
                            <div className="forecast-details">
                                <h4>AM</h4>
                                <p>Summary: {forecast.am.summary}</p>
                                <p>Wind Speed: {forecast.am.windSpeed}</p>
                                <p>Wind Direction: {forecast.am.windDirection}</p>
                                <p>Snow: {forecast.am.snow}</p>
                                <p>Rain: {forecast.am.rain}</p>
                                <p>Max Temp: {forecast.am.maxTemp}</p>
                                <p>Wind Chill: {forecast.am.windChill}</p>
                                <p>Humidity: {forecast.am.humidity}</p>
                                <p>Freeze Level: {forecast.am.freezeLevel}</p>
                                <h4>PM</h4>
                                <p>Summary: {forecast.pm.summary}</p>
                                <p>Wind Speed: {forecast.pm.windSpeed}</p>
                                <p>Wind Direction: {forecast.pm.windDirection}</p>
                                <p>Snow: {forecast.pm.snow}</p>
                                <p>Rain: {forecast.pm.rain}</p>
                                <p>Max Temp: {forecast.pm.maxTemp}</p>
                                <p>Wind Chill: {forecast.pm.windChill}</p>
                                <p>Humidity: {forecast.pm.humidity}</p>
                                <p>Freeze Level: {forecast.pm.freezeLevel}</p>
                                <h4>Night</h4>
                                <p>Summary: {forecast.night.summary}</p>
                                <p>Wind Speed: {forecast.night.windSpeed}</p>
                                <p>Wind Direction: {forecast.night.windDirection}</p>
                                <p>Snow: {forecast.night.snow}</p>
                                <p>Rain: {forecast.night.rain}</p>
                                <p>Max Temp: {forecast.night.maxTemp}</p>
                                <p>Wind Chill: {forecast.night.windChill}</p>
                                <p>Humidity: {forecast.night.humidity}</p>
                                <p>Freeze Level: {forecast.night.freezeLevel}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default FiveDayConditions;